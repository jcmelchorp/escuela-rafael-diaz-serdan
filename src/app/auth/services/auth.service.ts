import { Injectable, Optional } from '@angular/core';
import { User as AuthUser, User } from '@rds-auth/models/user.model';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
/* import { Database } from '@angular/fire/compat/database';
import { Firestore } from '@angular/fire/compat/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { Auth, authState, getAdditionalUserInfo, GoogleAuthProvider, OAuthProvider, onAuthStateChanged, signInWithPopup, User, UserCredential } from '@angular/fire/auth';*/
import { Observable, of, from, Subscription, EMPTY } from 'rxjs';
import { switchMap, map, take, pluck } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user$: Observable<User>;
  private userCollection: string = 'users';

  constructor(
    public readonly afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFirestore
  ) { }

  getUser(id: string): Observable<User> {
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
      return from(
        this.afDatabase.database
          .ref()
          .child(`${this.userCollection}/${id}`)
          .onDisconnect()
          .update({ isOnline: status })
      );
    }
    return from(
      this.afDatabase
        .object(`${this.userCollection}/${id}`)
        .update({ isOnline: status })
    );
  }

  createUser(user: Partial<AuthUser>) {
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
          .object<AuthUser>(`${this.userCollection}/${key}`)
          .update(user)
      );
  }

  checkAdminRole(id: string): Observable<boolean> {
    return this.afDatabase
      .object<AuthUser>(`${this.userCollection}/${id}`)
      .valueChanges()
      .pipe(pluck('isAdmin'));
  }

  checkTeacherRole(id: string): Observable<boolean> {
    return this.afDatabase
      .object<AuthUser>(`${this.userCollection}/${id}`)
      .valueChanges()
      .pipe(pluck('isTeacher'));
  }
}
