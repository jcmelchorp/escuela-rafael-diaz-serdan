import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AccountDomain } from '@rds-accounts/models/account-domain.model';



@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.scss']
})
export class UsersGroupsComponent implements OnInit {
  @Input()
  users!: AccountDomain[];
  unassignedList: AccountDomain[] = [];
  @Output()
  groupList!: EventEmitter<AccountDomain>;
  constructor(
  ) { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<AccountDomain[]>): void {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
  }
}
