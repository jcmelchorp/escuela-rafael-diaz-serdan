import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Group } from '@rds-accounts/models/account-domain.model';
import { GroupsEntityService } from '@rds-store/groups/groups-entity.service';



import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit {
  groups$!: Observable<Group[]>;
  loaded$: Observable<boolean>;
  constructor(
    private groupsEntityService: GroupsEntityService,
  ) {
    this.loaded$ = this.groupsEntityService.loaded$;
  }
  ngOnInit(): void {
    this.groups$ = this.groupsEntityService.entities$
      .pipe(map(groups => {
        if (!groups) {
          this.groupsEntityService.getAll();
        }
        return groups;
      }));
  }



}
