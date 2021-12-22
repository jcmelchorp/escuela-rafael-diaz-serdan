import { Injectable, Optional } from '@angular/core';
import { User as AuthUser } from '@rds-auth/models/user.model';
import { Observable, of, from, Subscription, EMPTY } from 'rxjs';
import { switchMap, map, take, pluck, shareReplay, mergeMap } from 'rxjs/operators';
import { Database, objectVal, push, ref, update } from '@angular/fire/database';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User, UserCredential } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


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
    private readonly database: Database, @Optional() private auth: Auth, public readonly afs: Firestore,


  ) {

    const docRef = ref(this.database, this.collection);
    this.objectValue$ = objectVal(docRef)

  }

  getUser(id: string): Observable<AuthUser> {
    /* return this.afDatabase
      .object<User>(`${this.collection}/${id}`)
      .valueChanges(); */
    const docRef = ref(this.database, `${this.collection}/${id}`);
    return objectVal<AuthUser>(docRef, { keyField: 'id' })
  }
  getAuthUser(): Observable<AuthUser | null> {
    return authState(this.auth).pipe(
      switchMap((user: User) => {
        if (user) {
          const docRef = ref(this.database, `${this.collection}/${user.providerData[0].uid}`);
          const refCollection = doc(this.afs, this.collection, user.providerData[0].uid);
          return from(getDoc(refCollection)).pipe(
            mergeMap(userFs =>
              objectVal<AuthUser>(docRef).pipe(
                map(userDb => { return { ...userFs.data() as AuthUser, ...userDb as AuthUser } })
              )
            ));
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

  saveUser(user: Partial<AuthUser>) {
    const key = user.id;
    const rtdbRef = ref(this.database, `${this.collection}/${key}`);
    const afsRef = doc(this.afs, this.collection, key);
    return from(update(rtdbRef, user)).pipe(
      mergeMap(_ => from(updateDoc(afsRef, user)))
    )


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

