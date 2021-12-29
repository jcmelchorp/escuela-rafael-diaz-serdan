import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faChartBar } from '@fortawesome/free-regular-svg-icons';

import { ChartDataSets, ChartLegendOptions, ChartOptions, ChartType } from 'chart.js';

import { Label, Color, BaseChartDirective } from 'ng2-charts';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Score, ScoreListItem } from '../../models/score.model';


@Component({
  selector: 'app-profile-scores-bar-chart',
  templateUrl: './profile-scores-bar-chart.component.html',
  styleUrls: ['./profile-scores-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileScoresBarChartComponent implements OnInit {
  @Input() data: ScoreListItem[];
  copyData: ScoreListItem[];
  extraData: ScoreListItem[];
  avgData: ScoreListItem;
  raisedElev: number = 10;
  faChartBar = faChartBar;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];
  barChartData: ChartDataSets[];
  barChartLabels: Label[];
  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    aspectRatio: 2,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  ngOnInit(): void {
    this.copyData = [...Object.values(this.data)];
    this.avgData = this.copyData.splice(-1, 1).pop();
    this.extraData = this.copyData.splice(-2, 2);
    const nameArray: string[] = this.copyData.map(score => score.courseName);
    const data1: number[] = this.copyData.map(score => +score.unit1);
    const data2: number[] = this.copyData.map(score => +score.unit2);
    const data3: number[] = this.copyData.map(score => +score.unit3);
    const prom_materia: number[] = this.copyData.map(score => +score.prom_materia);
    this.barChartLabels = nameArray;
    this.barChartData = [
      { data: data1, label: 'Unidad 1' },
      { data: data2, label: 'Unidad 2' },
      { data: data3, label: 'Unidad 3' },
      { data: prom_materia, label: 'Promedio final', type: 'line' },
    ];
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
