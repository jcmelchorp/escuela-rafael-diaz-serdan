import { Injectable } from '@angular/core';
import { User } from '@rds-auth/models/user.model';
import { Database } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseV9Service } from '@rds-shared/generic/firebase-v9.service';
@Injectable()
/** AccountsService
 *  Service to manage user accounts in CRUD operations on Firestore
 */
export class AccountsService extends FirebaseV9Service<User> {
  constructor(
    public db: Firestore,
    public afDatabase: Database
  ) {
    super('users', db, afDatabase);
  }
  /*  create(user: Partial<User>): Observable<User> {
     const userRef = this.afDatabase.object<User>(this.collection);
     return from(userRef.update(user).then(() => user as User));
   }

   update(id: string, user: Partial<User>): Observable<User> {
     const userRef = this.afDatabase.object<User>(`${this.collection}/${id}`);
     return from(userRef.update(user).then(() => user as User));
   }
   getList(): Observable<User[]> {
     return this.afDatabase
       .list<User>(this.collection, (ref) =>
         ref.orderByChild('name/familyName')
       )
       .valueChanges()
       .pipe(take(1));
     //return this.db.collection<User>(`${this.collection}`).valueChanges().pipe(take(1));
     //return this.afDatabase.list<User>(`${this.collection}`, ref => ref.orderByChild('name/familyName')).valueChanges().pipe(take(1));
   }
   getById(id: string) {
     const userRef = this.afDatabase.object<User>(`${this.collection}/${id}`);
     return userRef.valueChanges();
   }

   delete(id: string): Observable<string> {
     const userRef = this.afDatabase.object<User>(`${this.collection}/${id}`);
     return from(userRef.remove()).pipe(map(() => id));
   } */

  /*  upsert(item: User): Observable<User> {
    const itemToUpsert = item as User;
    if (itemToUpsert.id) {
      return this.update(itemToUpsert.id, itemToUpsert);
    } else {
      return this.create(itemToUpsert);
    }
  }

  create(item: Partial<User>): Observable<User> {
    set(this.userRef, item as User);
    const ref = doc(this.db, `${this.collection}/${item.id}`);
    return from(setDoc(ref, item).then(() => item as User));
  }

  update(id: string, item: Partial<User>): Observable<User> {
    update(this.userRef, item as User);
    const ref = doc(this.db, `${this.collection}/${item.id}`);
    return from(setDoc(ref, item).then(() => item as User));
  }
  getList(): Observable<User[]> {
    return this.users;
    //return this.db.collection<User>(`${this.collection}`).valueChanges().pipe(take(1));
    //return this.afDatabase.list<User>(`${this.collection}`, ref => ref.orderByChild('name/familyName')).valueChanges().pipe(take(1));
  }
  getById(id: string) {
    return docData(doc(this.db, this.collection, id)).pipe(
      map((d) => d as User)
    );
  }

  delete(id: string): Observable<string> {
    return from(
      deleteDoc(doc(this.db, `${this.collection}/${id}`)).then(() => id)
    );
  } */
}
