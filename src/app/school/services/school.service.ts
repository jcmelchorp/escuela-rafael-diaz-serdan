import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { QueryParams } from '@ngrx/data';

import { User } from '@rds-auth/models/user.model';


import { ToastrService } from 'ngx-toastr';

import { from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Grade, Score } from '@rds-auth/models/grade.model';


@Injectable()
export class SchoolService {
  user$: Observable<firebase.User>;
  private periodCollection: string = 'periods';
  private userCollection: string = 'users';
  private currentScore: string = 'currentGrades';
  usersDb: AngularFireList<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFirestore,
    private toastrService: ToastrService
  ) {
    this.user$ = this.getAuthState().pipe(
      switchMap((user) => {
        if (user) {
          return this.afDatabase
            .object<User[]>(
              `${this.userCollection}/${user.providerData[0].uid}`
            )
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.usersDb = this.afDatabase.list<User>(this.userCollection);
  }
  createPeriod(yi: string, yf: string) {
    this.afStore
      .collection(this.periodCollection)
      .doc(`${yi}${yf}`)
      .set({ cicle: `${yi}-${yf}` });
  }
  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }
  getUsers() {
    const usersRef = this.afDatabase.list<User>(
      `${this.userCollection}`,
      (ref) => ref.orderByChild('name/familyName')
    );
    return usersRef.valueChanges();
  }

  getUser(id: string): Observable<User> {
    return this.afDatabase
      .object<User>(`${this.userCollection}/${id}`)
      .valueChanges();
  }
  getCurrentScore(id: string): Observable<Grade> {
    return this.afDatabase
      .object<Grade>(`${this.userCollection}/${id}/${this.currentScore}`)
      .valueChanges();
  }
  getScores(id: string): Observable<Score> {
    return this.afDatabase
      .object<Score>(`${this.userCollection}/${id}/${this.currentScore}/scores`)
      .valueChanges();
  }
  createUser(user: any): Observable<User> {
    const key = user.id;
    this.afStore
      .collection(`${this.userCollection}`)
      .doc(key)
      .set(user, { merge: true })
      .then(
        () => console.log('User created on Firestore'),
        () => console.log('Error creating user on Firestore')
      );
    this.afDatabase
      .object<User>(`${this.userCollection}/${key}`)
      .set(user)
      .then(
        () => console.log('User created on Realtime DB'),
        () => console.log('Error creating user on Realtime DB')
      );
    return this.afDatabase
      .object<User>(`${this.userCollection}/${key}`)
      .valueChanges();
  }
  updateUser(id: string, user: Partial<User>): Observable<User> {
    this.afDatabase
      .object<User>(`${this.userCollection}/${id}`)
      .update(user)
      .then(() => { })
      .catch((reason) =>
        this.toastrService.error(`Ocurrió un error: ${reason}`, 'Error', {
          timeOut: 10000,
        })
      );
    this.afStore
      .collection<User>(`${this.userCollection}`)
      .doc(id)
      .update(user)
      .then(() => { })
      .catch((reason) =>
        this.toastrService.error(`Ocurrió un error: ${reason}`, 'Error', {
          timeOut: 10000,
        })
      );
    return this.getUser(id);
  }
  deleteUser(userId: string): Promise<string> {
    return this.afDatabase
      .object<User>(`${this.userCollection}/${userId}`)
      .remove()
      .then(
        () => userId,
        () => {
          console.log('Error deleting user on Realtime DB');
          return userId;
        }
      );
  }

  changeAdminPrivileges(id: string, isAdmin: boolean): Observable<void> {
    const adminsRef = this.afDatabase.object(`${this.userCollection}/${id}`);
    this.afDatabase.object(`${this.userCollection}/${id}`).update({ isAdmin });
    return from(adminsRef.set(true));
  }
}
