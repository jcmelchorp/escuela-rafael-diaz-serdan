import { Injectable, Optional } from '@angular/core';
import { User as AuthUser } from '@rds-auth/models/user.model';
import firebase from 'firebase/compat/app';
import { Observable, of, from, Subscription, EMPTY } from 'rxjs';
import { switchMap, map, take, pluck, shareReplay } from 'rxjs/operators';
import { Database, objectVal, push, ref, update } from '@angular/fire/database';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User, UserCredential } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  user$: Observable<User>;
  private collection: string = 'users';
  public readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User> = EMPTY;
  showLoginButton = false;
  showLogoutButton = false;
  public readonly objectValue$: Observable<any>;
  constructor(
    /* public readonly afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFirestore */
    private readonly database: Database, @Optional() private auth: Auth

  ) {

    const doc = ref(this.database, this.collection);
    this.objectValue$ = objectVal(doc)

  }

  getUser(id: string): Observable<AuthUser> {
    /* return this.afDatabase
      .object<User>(`${this.collection}/${id}`)
      .valueChanges(); */
    const doc = ref(this.database, `${this.collection}/${id}`);
    return objectVal<AuthUser>(doc, { keyField: 'id' })
  }
  getAuthUser(): Observable<AuthUser | null> {
    return authState(this.auth).pipe(
      switchMap((user: User) => {
        if (user) {
          const doc = ref(this.database, `${this.collection}/${user.providerData[0].uid}`);
          return objectVal<AuthUser>(doc, { keyField: 'id' });
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
    const doc = ref(this.database, `${this.collection}/${id}`);
    return from(update(doc, { isOnline: status }));
  }

  createUser(user: Partial<AuthUser>) {
    const key = user.id;
    /*   return this.afStore
        .collection(this.collection)
        .doc(key)
        .set(
          {
            ...user,
            isVerified: user.isVerified,
            uid: user.uid,
          },
          { merge: true }
        )
        .then(() => */
    /* this.afDatabase
      .object<AuthUser>(`${this.collection}/${key}`)
      .update(user)
  ); */
    const doc = ref(this.database, `${this.collection}/${key}`);
    return from(push(doc))
  }

  checkAdminRole(id: string): Observable<boolean> {
    /* return this.afDatabase
      .object<AuthUser>(`${this.collection}/${id}`)
      .valueChanges()
      .pipe(pluck('isAdmin')); */
    const doc = ref(this.database, `${this.collection}/${id}`);
    return objectVal(doc).pipe(pluck('isAdmin'));
  }

  checkTeacherRole(id: string): Observable<boolean> {
    /*  return this.afDatabase
       .object<AuthUser>(`${this.collection}/${id}`)
       .valueChanges()
       .pipe(pluck('isTeacher')); */
    const doc = ref(this.database, `${this.collection}/${id}`);
    return objectVal(doc).pipe(pluck('isTeacher'));
  }
}

