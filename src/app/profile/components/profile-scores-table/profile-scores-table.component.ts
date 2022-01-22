import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';

import { faComments } from '@fortawesome/free-regular-svg-icons';
import { Score, ScoreListItem } from '../../models/score.model';
import { ScoreListItemDataSource } from './score-list-item.datasource';


@Component({
  selector: 'app-profile-scores-table',
  templateUrl: './profile-scores-table.component.html',
  styleUrls: ['./profile-scores-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProfileScoresTableComponent implements OnInit, OnChanges {
  @Input() data: Score;
  copyData: ScoreListItem[] = [];
  extraData: ScoreListItem[];
  avgData: ScoreListItem;
  faComments = faComments;
  displayedColumns = ['courseName', 'unit1', 'unit2', 'unit3', 'prom_materia'];
  optative: ScoreListItemDataSource;
  formative: ScoreListItemDataSource;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  ngOnChanges(changes: SimpleChanges): void {
    const dataChange: SimpleChange = changes.data;
    if (dataChange.currentValue) {
      this.data = dataChange.currentValue;
      this.prepareData();
    }
  }
  ngOnInit() {
    this.prepareData();
  }
  prepareData() {
    this.copyData = [];
    this.copyData.push(...this.data.scores);
    this.formative = new ScoreListItemDataSource(this.copyData);
    //this.avgData = this.copyData.splice(-1, 1).pop();
    this.extraData = this.copyData.splice(-2, 2);
    this.optative = new ScoreListItemDataSource(this.extraData)
  }
  getAverage() {
    let sum1: number = 0;
    let sum2: number = 0;
    let sum3: number = 0;
    let sum4: number = 0;

    let count = 0;
    this.copyData.forEach(score => {
      sum1 = + score.unit1 + sum1;
      sum2 = + score.unit2 + sum2;
      sum3 = + score.unit3 + sum3;
      sum4 = + score.prom_materia + sum4;
      count++;
    });
    const avg1 = (Math.trunc(10 * (sum1 / count)) / 10).toString();
    const avg2 = (Math.trunc(10 * (sum2 / count)) / 10).toString();
    const avg3 = (Math.trunc(10 * (sum3 / count)) / 10).toString();
    const avg4 = (Math.trunc(10 * (sum4 / count)) / 10).toString();
    return [avg1, avg2, avg3, avg4]
  }


}
