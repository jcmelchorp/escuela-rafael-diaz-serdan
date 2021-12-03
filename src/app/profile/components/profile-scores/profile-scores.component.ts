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
import { Cycle } from '@rds-school/models/school-course.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ScoresEntityService } from '@rds-store/scores/scores-entity.service';
import { selectUserId } from '../../../auth/state/auth.selectors';
import { CourseLevel } from '@rds-auth/models/user.enum';

@Component({
  selector: 'app-profile-scores',
  templateUrl: './profile-scores.component.html',
  styleUrls: ['./profile-scores.component.scss'],
  animations: [fadeInAnimation]
})
export class ProfileScoresComponent implements OnInit {
  userScore: Observable<Score>;
  user$: Observable<User>;
  isTeacher$: Observable<boolean>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  level: CourseLevel;
  cycleKeys;
  cycles = Cycle;
  cycleForm: FormGroup;
  selectedScore: Observable<Score>;
  userId: string;
  userName: string;
  userSub: Subscription;
  today: Date = new Date();
  faFilePdf = faFilePdf;
  user: User;
  timeOpenScores: boolean = false;
  constructor(
    private scoresEntityService: ScoresEntityService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private subService: SubscriptionService,
  ) {
    this.initForm();
    this.loading$ = this.scoresEntityService.loading$;
    this.loaded$ = this.scoresEntityService.loaded$;
    this.cycleKeys = Object.keys(this.cycles);
    this.isTeacher$ = this.store.select(isTeacher);
    this.user$ = this.store.select(selectUser).pipe(tap(user => this.userId = user.id));
    //this.timeOpenScores = (this.today.getDate() > new Date('30/nov/2021').getDate()) ? true : false;
    this.timeOpenScores = true;
  }
  ngOnInit(): void {
    this.getScoresByCycle(this.cycle);
  }
  get cycle() {
    return this.cycleForm.get('cycle').value;
  }
  getScoresByCycle(cycle: Cycle) {
    console.log(cycle)
    this.selectedScore = this.scoresEntityService.entities$.pipe(
      map(scores => scores.find(s => s.id === this.userId + cycle)),
    );
  }
  initForm() {
    this.cycleForm = this.fb.group({
      cycle: new FormControl(this.route.snapshot.queryParams.cycle)
    });
  }
  printPage() {
    window.print();
  }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
}

