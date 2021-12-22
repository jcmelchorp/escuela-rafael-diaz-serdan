import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { Group, UserStudent } from '@rds-accounts/models/account-domain.model';
import { AppState } from '@rds-store/app.state';


import { AddUserGroupComponent } from '..';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input()
  group!: Group;
  newStudent: any;


  openDialog(student?: UserStudent, idx?: number): void {

    const dialogRef = this.dialog.open(AddUserGroupComponent, {
      width: '500px',
      data: student
        ? { student: { ...student }, isNew: false, groupId: this.group.id, idx }
        : { student: this.newStudent, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          //this.groupService.updateQuestions(this.group.id, [
          //  ...this.group.students,
          //  result.student
          //]);
        } else {
          const update = this.group.students;
          update?.splice(result.idx, 1, result.student);
          //this.groupService.updateQuestions(this.group.id, this.group.students);
        }
      }
    });
  }

  handleDelete() {
    //this.store.dispatch(new fromQuiz.QuizDeleted({ group: this.group }));
    // this.groupService.deleteQuiz(this.group.id);
  }

  constructor(
    //private groupService: QuizService,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }
}
