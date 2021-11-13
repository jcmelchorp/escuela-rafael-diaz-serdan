import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { select, Store } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { isTeacher, selectUser } from '@rds-auth/state/auth.selectors';
import { SubscriptionService } from '@rds-shared/services';
import { AppState } from '@rds-store/app.state';
import { Observable, Subscription } from 'rxjs';
import { map, tap, switchMap, concatMap } from 'rxjs/operators';

import { Score } from '@rds-profile/models/score.model';
import { ScoresEntityService } from '../../../store/scores/school-entity.service';

@Component({
  selector: 'app-profile-scores',
  templateUrl: './profile-scores.component.html',
  styleUrls: ['./profile-scores.component.scss']
})
export class ProfileScoresComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;
  userScore: Observable<Score>;
  user$: Observable<User>;
  isTeacher$: Observable<boolean>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  cycle: string;
  userId: string;
  userName: string;
  userSub: Subscription;
  today: Date = new Date();
  faFilePdf = faFilePdf;
  user: User;
  constructor(
    private scoreEntityService: ScoresEntityService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private subService: SubscriptionService
  ) {
    this.loading$ = this.scoreEntityService.loading$;
    this.loaded$ = this.scoreEntityService.loaded$;
    this.isTeacher$ = this.store.pipe(select(isTeacher));
  }
  ngOnInit(): void {
    this.user$ = this.store.select(selectUser).pipe(
      concatMap(user => this.scoreEntityService.entities$.pipe(
        map(scores => {
          return {
            ...user,
            score: scores.find(s =>
              s.cicleId === this.route.snapshot.queryParams.cycle &&
              s.userId === user.id
            )
          }
        })
      )),
      tap(score => console.log(score)),
    )
  }
  printPage() {
    window.print();
  }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
}
