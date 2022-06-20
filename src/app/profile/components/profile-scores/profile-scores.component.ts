import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { User } from '@rds-auth/models/user.model';
import { isTeacher, selectUser, selectUserId } from '@rds-auth/state/auth.selectors';
import { SubscriptionService } from '@rds-shared/services';
import { AppState } from '@rds-store/app.state';
import { merge, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, tap, mergeMap, switchMap } from 'rxjs/operators';

import { Score } from '@rds-profile/models/score.model';
import { fadeInAnimation } from '@rds-shared/animations/fade-in.animation';
import { Cycle, SchoolCycle } from '@rds-school/models/school-course.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ScoresEntityService } from '@rds-store/scores/scores-entity.service';
import { CourseLevel } from '@rds-auth/models/user.enum';
import { AccountsEntityService } from '@rds-store/accounts/accounts-entity.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "src/assets/pdf/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  },
  Poppins: {
    normal: 'Poppins-Light.ttf',
    bold: 'Poppins-Bold.ttf',
    italics: 'Poppins-LightItalic.ttf',
    bolditalics: 'Poppins-BoldItalic.ttf'
  },
  FredokaOne: {
    normal: 'FredokaOne-Regular.ttf',
    bold: 'FredokaOne-Regular.ttf',
    italics: 'FredokaOne-Regular.ttf',
    bolditalics: 'FredokaOne-Regular.ttf',
  },
}
//import * as fr from 'src/assets/pdf/FredokaOne.ttf.Base64.encoded';
import { ScoreListItem } from '../../models/score.model';
import { SchoolCyclesEntityService } from '@rds-store/school/school-cycles/school-cycles-entity.service';

@Component({
  selector: 'app-profile-scores',
  templateUrl: './profile-scores.component.html',
  styleUrls: ['./profile-scores.component.scss'],
  animations: [fadeInAnimation]
})
export class ProfileScoresComponent implements OnInit {
  userScore: Observable<Score>;
  user$: Observable<User>;
  cycles$: Observable<SchoolCycle[]>;
  cycle$: Observable<SchoolCycle>;
  //cycleId: string;
  user: User;
  score: Score
  isTeacher$: Observable<boolean>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  loading_cycles$: Observable<boolean>;
  level: CourseLevel;
  cycle: SchoolCycle;
  cycles: SchoolCycle[];
  cycleForm: FormGroup;
  selectedScore: BehaviorSubject<Score> = new BehaviorSubject(null);
  selectedScore$: Observable<Score>;
  userId: string;
  userName: string;
  userSub: Subscription;
  today: Date = new Date();
  dayOfBirth: Date;
  faFilePdf = faFilePdf;
  timeOpenScores: boolean = false;
  constructor(
    private scoresEntityService: ScoresEntityService,
    private accountsEntityService: AccountsEntityService,
    private schoolCyclesEntityService: SchoolCyclesEntityService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private subService: SubscriptionService,
  ) { }
  ngOnInit(): void {
    //this.cycleId = this.route.snapshot.queryParams.cycle;
    this.user$ = this.store.select(selectUser)
      .pipe(
        tap(user => {
          this.userId = user.id;
          this.scoresEntityService.setFilter({ id: user.id + this.route.snapshot.queryParams.cycle });
        }),
        mergeMap(user => this.accountsEntityService.entities$.pipe(map(accounts => {
          return accounts.find(account => account.id === user.id);
        }))),
        tap(user => this.user=user)
      );
    this.loading$ = this.scoresEntityService.loading$;
    this.loading_cycles$ = this.schoolCyclesEntityService.loading$;
    this.loaded$ = this.scoresEntityService.loaded$.pipe(
      mergeMap(loaded => this.schoolCyclesEntityService.loaded$.pipe(
        map(loaded_cycles => loaded && loaded_cycles)
      ))
    );
    this.cycleForm = this.fb.group({
      cycle: new FormControl()
    });
    this.cycles$ = this.schoolCyclesEntityService.entities$.pipe(map(cycles => this.cycles=cycles));
    this.schoolCyclesEntityService.setFilter({ isCurrentDefault: true });

    this.cycle$ = this.schoolCyclesEntityService.filteredEntities$.pipe(
      map(cycles => {
        this.cycle = cycles[0];
        this.cycleForm.patchValue({ cycle: cycles[0].id });
        return cycles[0];
      }));
    this.isTeacher$ = this.store.select(isTeacher);



    this.cycleForm.valueChanges
      .subscribe((changes) => {
        Object.keys(changes).forEach((key) => changes[key] == null && delete changes[key]);
        this.scoresEntityService.setFilter({ id: this.userId + changes.cycle });
      });

    this.selectedScore$ = this.scoresEntityService.filteredEntities$.pipe(
      map(scores => {
        const score = scores[0];
        const scores_ph = score.scores.map(scoreCourse => {
          return {
            ...scoreCourse,
            unit1: scoreCourse.unit1 ? (scoreCourse.unit1 === 'Acreditado' ? 'A' : scoreCourse.unit1) : '-',
            unit2: scoreCourse.unit2 ? (scoreCourse.unit2 === 'Acreditado' ? 'A' : scoreCourse.unit2) : '-',
            unit3: scoreCourse.unit3 ? (scoreCourse.unit3 === 'Acreditado' ? 'A' : scoreCourse.unit3) : '-',
            prom_materia: scoreCourse.prom_materia ? (scoreCourse.prom_materia.toLocaleString() === 'Acreditado' ? 'A' : scoreCourse.prom_materia) : '-'
          } as ScoreListItem
        })
        return { ...score, scores: scores_ph } as Score;
      }),
      tap(score => {this.score=score})
    );
    //this.timeOpenScores = (this.today.getDate() > new Date('30/nov/2021').getDate()) ? true : false;
    this.timeOpenScores = true;
    //this.initForm();
    //this.selectScore(this.route.snapshot.queryParams.cycle)
  }
  get cycleId() {
    return this.cycleForm.get('cycle').value;
  }

  /*   initForm() {

    } */

  /* selectScore(cycleId?: string) {
    console.log(cycleId)
    this.scoresEntityService.entities$.pipe(
      map(scores => scores.find(s => s.id === this.userId + cycleId)))
      .subscribe(score => {
        console.log(score);
        const scores_ph = score.scores.map(scoreCourse => {
          return {
            ...scoreCourse,
            unit1: scoreCourse.unit1 ? (scoreCourse.unit1 === 'Acreditado' ? 'A' : scoreCourse.unit1) : '---',
            unit2: scoreCourse.unit2 ? (scoreCourse.unit2 === 'Acreditado' ? 'A' : scoreCourse.unit2) : '---',
            unit3: scoreCourse.unit3 ? (scoreCourse.unit3 === 'Acreditado' ? 'A' : scoreCourse.unit3) : '---',
            //prom_materia: scoreCourse.prom_materia ? scoreCourse.prom_materia.toString() : '---'
          } as ScoreListItem
        })
        const score_ph = { ...score, scores: scores_ph } as Score;
        this.selectedScore$.next(score_ph);
      });
  } */
  printPage() {
    window.print();
  }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
  async generatePDF(action) {
    // const score=await this.selectedScore.pipe(tap(score => this.score = score)).toPromise();
    // const user =await this.user$.pipe(tap(user => this.user = user)).toPromise();
    //pdfFonts.pdfMake.vfs['FredokaOne.ttf'] = fr.fredokaOne;
    //console.log(pdfFonts)

    //pdfMake.vfs = pdfFonts.pdfMake.vfs;

    /* console.log(this.cycles)
    console.log(this.score) */

    const buildTableBody = (data: any[], columns: string[]) => {
      var body = [];
      //body.push(columns);
      data.forEach((row) => {
        var dataRow = [];
        columns.forEach((column) => {
          if (columns.indexOf(column) === 0) {
            dataRow.push({ text: row[column], alignment: 'left' });
          } else if (columns.indexOf(column) === columns.length - 1) {
            dataRow.push({ text: row[column], fillColor: '#0060a0', fillOpacity: 0.3, alignment: 'center' });
          } else {
            dataRow.push({ text: row[column], fillColor: '#0060a0', fillOpacity: 0.05, alignment: 'center' })
          }
          //dataRow.push(row[column]);
        });
        body.push(dataRow);
      });
      return body;
    };
    const getBase64ImageFromURL = (url) => {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        };
        img.onerror = error => {
          reject(error);
        };
        img.src = url;
      });
    }
    const docDefinition = {
      info: {
        title: 'Boleta escolar - RDS',
        author: 'Servicios Escolares',
        //subject: this.pdfData.subject,
        //keywords: this.pdfData.keywords,
        creator: 'Dirección escolar',
        creationDate: new Date(),
      },
      header: {
        margin: 40,
        columns: [
          {
            // usually you would use a dataUri instead of the name for client-side printing
            // sampleImage.jpg however works inside playground so you can play with it
            image: await getBase64ImageFromURL(
              '/assets/images/rds-newlogo-transparent.png'),
            width: 95
          },

        ]
      },
      content: [
        {
          text: 'Escuela Rafael Díaz Serdán',
          font: 'FredokaOne',
          fontSize: 20,
          bold: false,
          color: '#0060a0',
          alignment: 'center',
        },

        {
          text: 'Informe de calificaciones',
          fontSize: 14,
          alignment: 'center',
        },
        {
          margin: [0, 64, 0, 16],
          columns: [
            [
              {
                text: this.user.displayName,
                fontSize: 14,
                alignment: 'left'
              },
              {
                text: this.user.curp,
                fontSize: 11,
                alignment: 'left',
                color: '#40555e',
              },
              {
                text: this.user.primaryEmail,
                fontSize: 11,
                alignment: 'left',
                color: '#40555e',
              },
            ],
            [
              {
                text: `Ciclo escolar: ${this.cycles.find(c => c.id === this.score.cycle).label}`,
                alignment: 'right',
                fontSize: 11,
              },
              {
                text: `Grado: ${this.user.grade}`,
                alignment: 'right',
                fontSize: 11,
              },
              {
                text: `Fecha de consulta: ${new Date().toLocaleString()}`,
                alignment: 'right',
                fontSize: 11,
              }
            ]
          ]
        },
        {
          layout: {
            hLineWidth: (i, node) => { return i > this.score.scores.length ? 1 : 0; },
            vLineWidth: (i, node) => { return (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5) ? 1 : 0; },
            hLineColor: (i, node) => { return i > this.score.scores.length ? '#0060a0' : '#ffffff'; },
            vLineColor: (i, node) => { return '#0060a0' },
            paddingBottom: (i, node) => {
              switch (i) {
                case 0:
                  return 4;
                default:
                  return 2;
              }
            },
            paddingTop: (i, node) => {
              switch (i) {
                case 0:
                  return 4;
                default:
                  return 2;
              }
            }
          },
          table: {
            headerRows: 0,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            fontSize: 11,
            alignment: 'center',
            body: [
              [
                { text: 'Materia', fillColor: '#0060a0', color: 'white', bold: true, fontSize: 10 },
                { text: '1° trim.', fillColor: '#0060a0', color: 'white', bold: true, fontSize: 10 },
                { text: '2° trim.', fillColor: '#0060a0', color: 'white', bold: true, fontSize: 10 },
                { text: '3° trim.', fillColor: '#0060a0', color: 'white', bold: true, fontSize: 10 },
                { text: 'Final', fillColor: '#0060a0', color: 'white', bold: true, fontSize: 10 },
              ],
              ...buildTableBody(this.score.scores, ['courseName', 'unit1', 'unit2', 'unit3', 'prom_materia'])
            ]
          },
        },
        {
          text: 'Comentarios de los profesores',
          margin: [0, 15, 0, 15],
          fontSize: 12,
        },
        {
          ul: [
            `Unidad 1: \n ${this.score.scores.filter(score => score.notes1 !== '').map(score => score.notes1).join('\n')}`,
            `Unidad 2: \n ${this.score.scores.filter(score => score.notes2 !== '').map(score => score.notes2).join('\n')}`,
            `Unidad 3: \n ${this.score.scores.filter(score => score.notes3 !== '').map(score => score.notes3).join('\n')}`, ,
          ],
          fontSize: 10,
        }
      ],
      defaultStyle: {
        font: 'Poppins',
        fontSize: 12,
        bold: false,
        color: 'black'
      }
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition as unknown as TDocumentDefinitions).download(`${this.user.curp.slice(0, 10)}_${this.cycles[this.score.cycle]}.pdf`);
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition as unknown as TDocumentDefinitions).print();
    } else {
      pdfMake.createPdf(docDefinition as unknown as TDocumentDefinitions).open();
    }


  }

}

