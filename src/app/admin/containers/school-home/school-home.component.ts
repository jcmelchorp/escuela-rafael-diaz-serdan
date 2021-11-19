import { Component, OnInit } from '@angular/core';

import { QueryParams } from '@ngrx/data';
import { AccountDomain } from '@rds-accounts/models/account-domain.model';
import { CourseLevel, SchoolLevel } from '@rds-auth/models/user.enum';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-school-home',
  templateUrl: './school-home.component.html',
  styleUrls: ['./school-home.component.scss'],
})
export class SchoolHomeComponent implements OnInit {
  users$!: Observable<AccountDomain[]>;
  loaded$: Observable<boolean>;
  level!: string;
  grade!: string;
  fullName!: string;
  clevelKeys: any;
  clevels = CourseLevel;
  slevelKeys: any;
  slevels = SchoolLevel;
  queryParams!: QueryParams;
  raisedElev = 8;
  searching: boolean = false;

  constructor(private accountsDomainEntityService: AccountsDomainEntityService) {
    this.loaded$ = this.accountsDomainEntityService.loaded$;
    this.clevelKeys = Object.keys(this.clevels).filter(Number);
    this.slevelKeys = Object.keys(this.slevels).filter(Number);
    /*  this.level = "Primaria";
     this.grade = "1° de Primaria";
     this.queryParams = { level: this.level, grade: this.grade }; */
  }

  ngOnInit(): void {
    this.queryParams = { level: this.level, grade: this.grade };
    this.users$ = this.accountsDomainEntityService.entities$.pipe(
      map((users) => {
        if (!users) {
          this.accountsDomainEntityService.getWithQuery(this.queryParams);
        }
        return users.filter((x) => x.orgUnitPath?.endsWith(this.grade));
      })
    );
  }
  onLevelelection(event: any) {
    this.level = event.key;
    this.queryParams = { level: this.level, grade: this.grade };
  }
  onGradeSelection(event: any) {
    this.grade = event.key;
    this.queryParams = { level: this.level, grade: this.grade };
  }
  onSearch() {
    this.queryParams = { level: this.level, grade: this.grade };
    this.users$ = this.accountsDomainEntityService.entities$.pipe(
      map((users) => {
        if (!users) {
          this.accountsDomainEntityService.getWithQuery(this.queryParams);
        }
        return users.filter((x) => x.orgUnitPath?.endsWith(this.grade));
      })
    );
  }
}
