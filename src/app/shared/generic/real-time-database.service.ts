import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from "rxjs/operators";
import { from, Observable, of } from "rxjs";
import { Inject } from "@angular/core";
import { QueryParams } from "@ngrx/data";
import { Entity, firebaseSerialize } from '@rds-shared/models/firebase.model';

export class RealTimeDatabaseService<T extends Entity> {
  // Reference to the Collection in Firestore
  private collectionName: string;
  /* We need to ask for the AngularFirestore and AngularFireDatabase Injectable and a Collection Name to use in Firestore and RealTime Database*/
  constructor(
    @Inject('DEFAULT_COLLECTION_NAME') public defaultCollectionName: string,
    private afdb: AngularFireDatabase,
  ) {
    if (!defaultCollectionName) {
      throw new Error('Firestore called with no collection name');
    }
    this.collectionName = defaultCollectionName;
  }
  /**
   * Add a new Entity to Firestore and RealTime Database.
   * We look for the Entity we want to add as well as an Optional Id, which will allow us to set the Entity into a specific Object in the List
   */
  add(entity: T, id?: string): Observable<T> {
    // We want to create a Typed Return of the added Entity
    if (id) {
      // If there is an ID Provided, lets specifically set the Document
      return from(this.afdb
        .list<T>(this.collectionName)
        .update(id, firebaseSerialize(entity))
      ).pipe(_ => of(entity))
    } else {
      const key = this.afdb.createPushId();
      return from(this.afdb
        .list<T>(this.collectionName)
        .push(firebaseSerialize({ id: key, ...entity }))
      ).pipe(_ => of(entity));
    }
  }

  /**
  * Our get method will fetch a single Entity by it's Document ID
  */
  get(id: string): Observable<T> {
    return this.afdb
      .object<T>(`${this.collectionName}/${id}`)
      .valueChanges()
      .pipe(take(1));
  }

  /*
   * Our list method will get all the Entities in the Collection
   */
  list(): Observable<T[]> {
    return this.afdb.list<T>(this.collectionName)
      .valueChanges()
      .pipe(take(1));
  }

  /* Our Update method takes the full updated Entity including it's ID property which it will use to find the Document. This is a Hard Update.  */
  update(entity: T): Observable<T> {
    return from(this.afdb.list<T>(this.collectionName)
      .update(entity.id, firebaseSerialize(entity))
    ).pipe(_ => of(entity));


  }

  delete(id: string): Observable<string> {
    return from(this.afdb.list<T>(this.collectionName)
      .remove(id)).pipe(_ => of(id));

  }

  getWithQuery(query: QueryParams): Observable<T[]> {
    return this.afdb.list<T>(this.collectionName,
      ref => ref
        .child(Object.keys(query)[0])
        .equalTo(Object.values(query)[0].toString())
        .orderByValue())
      .valueChanges()
      .pipe(take(1));
  }
}

