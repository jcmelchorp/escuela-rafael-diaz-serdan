import { Injectable } from '@angular/core';
//import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
/* import { Database } from '@angular/fire/compat/database';
import { Firestore } from '@angular/fire/compat/firestore'; */
import { User } from '@rds-auth/models/user.model';
import firebase from 'firebase/compat/app';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, take, pluck } from 'rxjs/operators';

@Injectable()
export class AuthService {
  /* collection: string = 'users';
  constructor(
    public readonly afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) { }

  getAuthUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return this.afDb
            .object(`${this.collection}/${user.providerData[0]?.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  saveUser(user: User) {
    const key = user.id;
    return from(
      this.afDb.object<User>(`${this.collection}/${key}`).update(user)
    );
  }

  signInWithCredential(credentials: firebase.auth.AuthCredential) {
    return this.signInWithCredential(credentials);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  checkAdminRole(id: string): Observable<boolean> {
    return this.afDb
      .object<User>(`${this.collection}/${id}`)
      .valueChanges()
      .pipe(pluck('isAdmin'));
  }

  checkTeacherRole(id: string): Observable<boolean> {
    return this.afDb
      .object<User>(`${this.collection}/${id}`)
      .valueChanges()
      .pipe(pluck('isTeacher'));
  }

  updateOnlineStatus(id: string, status: boolean): Observable<void> {
    if (status) {
      return from(
        this.afDb.database
          .ref()
          .child(`${this.collection}/${id}`)
          .onDisconnect()
          .update({ isOnline: status })
      );
    }
    return from(
      this.afDb.object(`${this.collection}/${id}`).update({ isOnline: status })
    );
  } */
  user$: Observable<User>;
  private userCollection: string = 'users';
  constructor(
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFirestore
  ) {
  }
  getUserById(id: string): Observable<User> {
    return this.afDatabase
      .object<User>(`${this.userCollection}/${id}`)
      .valueChanges();
  }
  getAuthUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return this.afDatabase
            .object(`${this.userCollection}/${user.providerData[0]?.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }
  signInWithCredential(
    credentials: firebase.auth.AuthCredential
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithCredential(credentials);
  }
  signInWithPopup(): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(_ => {
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }));
  }
  signOut(id: string) {
    //this.updateOnlineStatus(id, false);
    return from(this.afAuth.signOut());
  }
  updateOnlineStatus(id: string, status: boolean): Observable<void> {
    if (status) {
      //console.log('onDisconect branch', status)
      return from(
        this.afDatabase.database
          .ref()
          .child(`${this.userCollection}/${id}`)
          .onDisconnect()
          .update({ isOnline: status })
      );
    }
    //console.log('outer branch', status)
    return from(
      this.afDatabase
        .object(`${this.userCollection}/${id}`)
        .update({ isOnline: status })
    );
  }
  createUser(user: Partial<User>) {
    const key = user.id;
    return this.afStore
      .collection(this.userCollection)
      .doc(key)
      .set(
        {
          ...user,
          isVerified: user.isVerified,
          uid: user.uid,
        },
        { merge: true }
      )
      .then(() =>
        this.afDatabase
          .object<User>(`${this.userCollection}/${key}`)
          .update(user)
      );
  }

  checkAdminRole(id: string): Observable<boolean> {
    const val = this.afDatabase
      .object<User>(`${this.userCollection}/${id}`)
      .valueChanges();
    let isAdmin: Observable<boolean> = val.pipe(
      map((user) => {
        return user.isAdmin;
      })
    );
    return isAdmin;
  }

  checkTeacherRole(id: string): Observable<boolean> {
    const val = this.afDatabase
      .object<User>(`${this.userCollection}/${id}`)
      .valueChanges();
    let isTeacher: Observable<boolean> = val.pipe(
      map((user) => {
        return user.isTeacher;
      })
    );
    return isTeacher;
  }
}
