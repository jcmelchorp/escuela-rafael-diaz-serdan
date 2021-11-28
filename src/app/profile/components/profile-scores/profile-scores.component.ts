import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { select, Store } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { isTeacher, selectUser } from '@rds-auth/state/auth.selectors';
import { SubscriptionService } from '@rds-shared/services';
import { AppState } from '@rds-store/app.state';
import { Observable, Subscription } from 'rxjs';
import { map, tap, switchMap, concatMap, mergeMap } from 'rxjs/operators';

import { Score } from '@rds-profile/models/score.model';
import { ProfileService } from '../../services/profile.service';
import { expandFadeInAnimation, fadeInAnimation } from '@rds-shared/animations/fade-in.animation';

@Component({
  selector: 'app-profile-scores',
  templateUrl: './profile-scores.component.html',
  styleUrls: ['./profile-scores.component.scss'],
  animations: [fadeInAnimation]
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
    //private scoresEntityService: ScoresEntityService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private subService: SubscriptionService
  ) {
    /*  this.loading$ = this.scoresEntityService.loading$;
     this.loaded$ = this.scoresEntityService.loaded$; */
    this.cycle = this.route.snapshot.queryParams.p;
    this.isTeacher$ = this.store.pipe(select(isTeacher));
  }
  ngOnInit(): void {
    this.user$ = this.store.pipe(
      select(selectUser),
      tap(user => console.log(user.id + this.cycle)),
      mergeMap(user => this.profileService.getById(user.id + this.cycle).pipe(
        //tap(score => console.log(score)),
        map(score => { return { ...user, currentGrades: score } as User }),

      ))
    );
    /* this.user$ = this.scoresEntityService.entities$.pipe(
      map(scores => scores.find(s => s.id === s.userId + this.cycle)),
      mergeMap(score => this.store.select(selectUser).pipe(
        map(user => {
          return {
            ...user, score
          } as User
        })
      ))
    ) */
  }
  printPage() {
    window.print();
  }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
}
