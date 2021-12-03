import { Injectable, Optional } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { AccountDomain, Group } from '@rds-accounts/models/account-domain.model';
import { User } from '@rds-auth/models/user.model';


import { EMPTY, Observable } from 'rxjs';
@Injectable()
export class AdminFireService {
  public readonly users: Observable<AccountDomain[]>;
  user$: Observable<User | null> = EMPTY;
  private userCollection: string = 'users';
  constructor(private readonly afStore: Firestore) {
    const usersCollection = collection(
      afStore,
      this.userCollection
    ).withConverter<AccountDomain>({
      fromFirestore: (snapshot) => {
        const {
          uid,
          displayName,
          isAdmin,
          isTeacher,
          primaryEmail,
          authPhotoUrl,
          userPhotoUrl,
          isVerified,
          creationTime,
          lastLoginTime,
        } = snapshot.data();
        const { id } = snapshot;
        const { hasPendingWrites } = snapshot.metadata;
        return {
          id,
          displayName,
          isAdmin,
          isTeacher,
          uid,
          primaryEmail,
          authPhotoUrl,
          userPhotoUrl,
          isVerified,
          creationTime,
          lastLoginTime,
          hasPendingWrites,
        };
      },
      // TODO unused can we make implicit?
      toFirestore: (it: any) => it,
    });
    const usersQuery = query(usersCollection);

    this.users = collectionData(usersQuery);
  }

  getUsers(): Observable<AccountDomain[]> {
    return this.users;
  }

  async createGroup(group: Group) {
    const key = group.id;
    return setDoc(doc(this.afStore, `groups/${key}`), { ...group });
  }
}
