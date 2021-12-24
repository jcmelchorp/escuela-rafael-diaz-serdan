import { Injectable, Optional } from '@angular/core';
import { User as AuthUser } from '@rds-auth/models/user.model';
import { Observable, of, from, Subscription, EMPTY } from 'rxjs';
import { switchMap, map, take, pluck, shareReplay, mergeMap } from 'rxjs/operators';
import { Database, objectVal, push, ref, update } from '@angular/fire/database';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User, UserCredential } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseSerialize } from '@rds-shared/models/firebase.model';
import { isTeacher } from '../state/auth.selectors';
import { environment } from '@rds-env/environment';


@Injectable()
export class AuthService {
  private collection: string = 'users';
  constructor(
    private readonly database: Database,
    @Optional() private auth: Auth,
    public readonly afs: Firestore,
  ) { }

  getUser(id: string): Observable<AuthUser> {
    if (environment.useEmulators) {
      const docRef = ref(this.database, `${this.collection}/${id}`);
      return objectVal<AuthUser>(docRef, { keyField: 'id' });
    } else {
      const refCollection = doc(this.afs, this.collection, id);
      return from(getDoc(refCollection))
    }
  }
  getAuthUser(): Observable<AuthUser | null> {
    return authState(this.auth).pipe(
      switchMap((user: User) => {
        if (user) {
          if (environment.useEmulators) {
            const docRef = ref(this.database, `${this.collection}/${user.providerData[0].uid}`);
            return objectVal<AuthUser>(docRef)
          } else {
            const refCollection = doc(this.afs, this.collection, user.providerData[0].uid);
            return from(getDoc(refCollection))
          }
        } else {
          return of(null)
        }
      }
      ));
  }

  signInWithCredential(
    credentials: firebase.auth.AuthCredential
  ): Promise<firebase.auth.UserCredential> {
    return this.signInWithCredential(credentials);
  }
  signInWithPopup() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return from(signInWithPopup(this.auth, provider));
  };

  /*  signInWithPopup(): Observable<firebase.auth.UserCredential> {
     return from(this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(_ => {
       return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
     }));
   } */
  signOut(id: string) {
    //this.updateOnlineStatus(id, false);
    return from(signOut(this.auth));
  }
  updateOnlineStatus(id: string, status: boolean): Observable<void> {
    /* if (status) {
      return from(
        this.afDatabase.database
          .ref()
          .child(`${this.collection}/${id}`)
          .onDisconnect()
          .update({ isOnline: status })
      );
    }
    return from(
      this.afDatabase
        .object(`${this.collection}/${id}`)
        .update({ isOnline: status })
    ); */
    if (environment.useEmulators) {
      const doc = ref(this.database, `${this.collection}/${id}`);
      return from(update(doc, { isOnline: status }));
    } else {
      const afsRef = doc(this.afs, this.collection, id);
      return from(updateDoc(afsRef, { isOnline: status }));
    }
  }

  saveUser(user: AuthUser) {
    const key = user.id;
    if (environment.useEmulators) {
      const rtdbRef = ref(this.database, `${this.collection}/${key}`);
      return from(update(rtdbRef, user))
    } else {
      const afsRef = doc(this.afs, this.collection, key);
      return from(updateDoc(afsRef, firebaseSerialize(user)))
    }
  }
  checkAdminRole(id: string): Observable<boolean> {
    if (environment.useEmulators) {
      const doc = ref(this.database, `${this.collection}/${id}`);
      return objectVal(doc).pipe(pluck('isAdmin'));
    } else {
      const afsRef = doc(this.afs, this.collection, id);
      return from(getDoc(afsRef).then(user => user.data().isAdmin));
    }
  }

  checkTeacherRole(id: string): Observable<boolean> {
    if (environment.useEmulators) {
      const doc = ref(this.database, `${this.collection}/${id}`);
      return objectVal(doc).pipe(pluck('isTeacher'));
    } else {
      const afsRef = doc(this.afs, this.collection, id);
      return from(getDoc(afsRef).then(user => user.data().isTeacher));
    }
  }
}

