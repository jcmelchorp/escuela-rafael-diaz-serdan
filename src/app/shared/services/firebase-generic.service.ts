import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { SchoolCourse } from '../../school/models/school-course.model';
import { Inject } from "@angular/core";
import { QueryParams } from "@ngrx/data";

/**
 * Base Entity interface that our models will extend
 * */
export interface Entity {
  id?: string; // Optional for new Entities
}
/**
 * function that will turn our JS Objects into an Object that Firestore can work with
 * */
function firebaseSerialize<T>(object: T) {
  return JSON.parse(JSON.stringify(object));
}
export class FirebaseGenericService<T extends Entity> {
  // Reference to the Collection in Firestore
  collectionName: string;
  private fsCollection: AngularFirestoreCollection<T>;
  private rtdbList: AngularFireList<T>;

  /* We need to ask for the AngularFirestore and AngularFireDatabase Injectable and a Collection Name to use in Firestore and RealTime Database*/
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public defaultCollectionName: string,
    private afs: AngularFirestore,
    private afdb: AngularFireDatabase,
  ) {
    if (!defaultCollectionName) {
      throw new Error('Firestore called with no collection name');
    }
    this.collectionName = defaultCollectionName;
    // We then create the reference to this Collection
    this.rtdbList = this.afdb.list<T>(defaultCollectionName);
    this.fsCollection = this.afs.collection<T>(defaultCollectionName);
  }
  /**
   * Add a new Entity to Firestore and RealTime Database.
   * We look for the Entity we want to add as well as an Optional Id, which will allow us to set the Entity into a specific Document in the Collection
   */
  add(entity: T, id?: string): Promise<T> {
    // We want to create a Typed Return of the added Entity
    return new Promise<T>((resolve, reject) => {
      if (id) {
        // If there is an ID Provided, lets specifically set the Document
        this.fsCollection.doc(id).update(firebaseSerialize(entity)).then((ref) => { resolve(entity); });
        this.rtdbList.update(id, firebaseSerialize(entity)).then((ref) => { resolve(entity); });
      } else {
        // If no ID is set, allow Firestore to Auto-Generate one
        this.fsCollection.add(firebaseSerialize(entity)).then((ref) => {
          // Let's make sure we return the newly added ID with Model
          const newentity = {
            id: ref.id,
            ...entity,
          };
          resolve(newentity);
        });
        this.rtdbList.push(firebaseSerialize(entity)).then((ref) => { resolve(entity); });
      }
    });
  }

  /**
  * Our get method will fetch a single Entity by it's Document ID
  */
  get(id: string): Observable<T> {
    return this.fsCollection
      .doc<T>(id).snapshotChanges().pipe(
        // We want to map the document into a Typed JS Object
        map((doc) => {
          // Only if the entity exists should we build an object out of it
          if (doc.payload.exists) {
            const data = doc.payload.data() as T;
            const payloadId = doc.payload.id;
            return { id: payloadId, ...data };
          }
        })
      );
  }

  /*
   * Our list method will get all the Entities in the Collection
   */
  list(): Observable<T[]> {
    return this.fsCollection.snapshotChanges().pipe(
      // Again we want to build a Typed JS Object from the Document
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as T;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  /* Our Update method takes the full updated Entity including it's ID property which it will use to find the Document. This is a Hard Update.  */
  update(entity: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.fsCollection.doc<T>(entity.id as string).update(firebaseSerialize(entity)).then(() => { resolve({ ...entity, }); });
      this.rtdbList.update(entity.id, firebaseSerialize(entity)).then((ref) => { resolve(entity); });
    });
  }

  delete(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.fsCollection.doc<T>(id).delete().then(() => { resolve(); });
      this.rtdbList.remove(id).then(() => { resolve(); });
    });
  }

  getWithQuery(query: QueryParams) {
    return this.afs.collection(this.collectionName, ref => ref.where(
      query['field'].toString(),
      query['operation'] as any,
      query['value'].toString()
    )).snapshotChanges().pipe(
      // Again we want to build a Typed JS Object from the Document
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as T;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }
}

