import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';

import { Store, select } from '@ngrx/store';

import { AppState } from '@rds-store/index';

import { User } from '@rds-auth/models/user.model';
import * as fromAuthSelectors from '@rds-auth/state/auth.selectors';

import { UserProfileEntityService } from '@rds-store/classroom/user-profile/user-profile-entity.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassroomComponent implements OnInit {
  user$: Observable<User>;
  userProfile$: Observable<gapi.client.classroom.UserProfile>;
  isOnline$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  isTeacher$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  faIdCard = faIdCard;
  faIdCardAlt = faIdCardAlt;
  raisedElev: number = 12;
  userId: string;
  /** Based on the screen size, switch from standard to one column per row */
  cards = [
    {
      title: 'Sistema de administración',
      description: 'Panel personalizado para la administración de Google Admin.',
      route: 'under-construction',
      imgUrl: 'assets/images/system-administrator.png'
    },
    {
      title: 'Classroom',
      description: 'Realiza funciones globales y particulares en Google Classroom',
      route: 'under-construction',
      imgUrl: 'assets/images/classroom-administrator.png',
    },
    {
      title: 'Salones y grupos',
      description: 'Administra grados, grupos y horarios en la institución',
      route: 'under-construction',
      imgUrl: 'assets/images/schedule-administrator.png',
    },
  ];
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private userProfileES: UserProfileEntityService,
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.isLoading$ = this.userProfileES.loading$;
    this.userProfile$ = this.userProfileES.entities$.pipe(
      map(users => {
        if (!users) {
          this.userProfileES.getWithQuery(this.userId);
        }
        return users.find(x => x.id == this.userId);
      })
    );
    this.isOnline$ = this.store.pipe(select(fromAuthSelectors.isOnline));
    this.user$ = this.store.pipe(select(fromAuthSelectors.selectUser));
    this.isAdmin$ = this.store.pipe(select(fromAuthSelectors.isAdmin));
    this.isTeacher$ = this.store.pipe(select(fromAuthSelectors.isTeacher));
  }

  ngOnInit(): void {

  }

}
