import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';


import { Observable, of } from 'rxjs';
import { FirebaseOperation } from '@angular/fire/compat/database/interfaces';
import { Group, UserStudent } from '@rds-accounts/models/account-domain.model';

@Injectable()
export class GroupsService {
  public readonly groups!: Observable<Group[]>;
  collection: string = 'rooms';
  constructor(private afDatabase: AngularFireDatabase) { }

  get() {
    return this.groups;
  }
  createGroup(data: Group): Promise<void> {
    const key = data.id;
    const groupRef = this.afDatabase.object<Group>(`${this.collection}/${key}`);
    return groupRef.set(data);
  }
  /**
   * Update a partial Group Info for the current User
   */
  update(data: Group): Promise<void> {
    const key = data.id;
    const groupRef = this.afDatabase.object<Group>(`${this.collection}/${key}`);
    return groupRef.update(data);
  }

  // map(groups => groups.sort((a, b) => a.priority - b.priority))

  /**
   * Run a batch write to change the priority of each group for sorting
   */
  sortGroups(groups: Group[]): void {
    return;
  }

  /**
   * Delete group
   */
  deleteGroup(group: Group, userId: string): Promise<void> {
    const key = group.id;
    const groupRef = this.afDatabase.object<Group>(`${this.collection}/${key}`);
    return groupRef.remove();
  }

  /**
   * Updates the tasks on group
   */
  updateStudents(groupId: string, students: UserStudent[]) {
    const groupRef = this.afDatabase.list<UserStudent[]>(
      `${this.collection}/${groupId}/students`
    );
    return groupRef.set('key', students);
  }

  /**
   * Remove a specifc task from the group
   */
  removeStudent(groupId: string, student: UserStudent): Promise<void> {
    const groupRef = this.afDatabase.list<UserStudent[]>(
      `${this.collection}/${groupId}/students`
    );
    return groupRef.remove();
  }
}
