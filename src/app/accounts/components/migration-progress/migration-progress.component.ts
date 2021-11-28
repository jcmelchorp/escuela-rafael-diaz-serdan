import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@rds-auth/models/user.model';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { AccountsService } from '../../services/accounts.service';

@Component({
  templateUrl: './migration-progress.component.html',
  styleUrls: ['./migration-progress.component.scss']
})
export class MigrationProgressComponent implements OnInit {
  /* @Input()  */progress: number;
/* @Input() */ total: number;
  color: string;
  determinateCnt = 0;
  users: User[];
  interval: number;
  res: Observable<String>;
  constructor(
    private accountsService: AccountsService,
    private accountsEntityService: AccountsEntityService,
    private dialogRef: MatDialogRef<MigrationProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.accountsEntityService.count$.subscribe(count => {
      this.total = count;
      this.interval = count / 100;
    });
    this.accountsEntityService.entities$.subscribe(users => {
      this.users = users;
    });
    //if we don't have progress, set it to 0.
    if (!this.progress) {
      this.progress = 0;
    }
    //if we don't have a total aka no requirement, it's 100%.
    if (this.total === 0) {
      this.total = this.progress;
    } else if (!this.total) {
      this.total = 100;
    }
    //if the progress is greater than the total, it's also 100%.
    if (this.progress > this.total) {
      this.progress = 100;
      this.total = 100;
    }
    this.progress = (this.progress / this.total) * 100;
    if (this.progress < 55) {
      this.color = 'red';
    } else if (this.progress < 75) {
      this.color = 'yellow';
    } else {
      this.color = 'green';
    }
  }
  async startCounter() {
    this.users.forEach(async user => {
      await this.accountsService.migrationToFirestore(user).then(_ => console.log('User migrated'));
      this.progress = this.progress + this.interval;
    })
  }

  progressInLoading() {
    console.log('Determinate mode: ' + this.determinateCnt + '% completed...');
  }

}
