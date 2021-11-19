import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AccountDomain } from '@rds-accounts/models/account-domain.model';
import { User } from '@rds-auth/models/user.model';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountsService } from '@rds-accounts/services/accounts.service';

@Component({
  selector: 'app-users-domain',
  templateUrl: './users-domain.component.html',
  styleUrls: ['./users-domain.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDomainComponent implements OnInit {
  users$!: Observable<AccountDomain[]>;
  loaded$: Observable<boolean>;
  users!: AccountDomain[];
  constructor(
    private accountDomainEntityService: AccountsDomainEntityService,
    private accountsService: AccountsService
  ) {
    this.loaded$ = this.accountDomainEntityService.loaded$;
  }
  ngOnInit(): void {
    this.users$ = this.accountDomainEntityService.entities$.pipe(
      map((users) => {
        if (!users) {
          this.accountDomainEntityService.getAll();
        }
        return users;
      })
    );
  }
  onDbBackup(users: AccountDomain[]) {
    users.map(async (user) => {
      const userProfile = (
        await gapi.client.classroom.userProfiles.get({ userId: user.id })
      ).result;
      const newUser = {
        ...user,
        classroomPhotoUrl: userProfile.photoUrl,
        classroomPermissions: userProfile.permissions,
        isTeacher: userProfile.verifiedTeacher,
      };
      // this.accountsService.add(newUser as Partial<User>);
    });
  }
}
