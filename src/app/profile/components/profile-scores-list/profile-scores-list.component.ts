import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { faCheckCircle, faCheckSquare, faComments } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faChild, faCompressAlt, faCompressArrowsAlt, faExpandAlt, faExpandArrowsAlt, faFlagUsa, faHandHoldingHeart, faHiking, faPalette, faRunning, faSquareRootAlt, faStar, faTheaterMasks, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Score } from '../../models/score.model';


@Component({
  selector: 'app-profile-scores-list',
  templateUrl: './profile-scores-list.component.html',
  styleUrls: ['./profile-scores-list.component.scss']
})
export class ProfileScoresListComponent implements OnInit {
  @Input() data: Score;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  scores: any[];
  faCompressArrowsAlt = faCompressArrowsAlt;
  faExpandArrowsAlt = faExpandArrowsAlt;
  faStar = faStar;
  faCheck = faCheck;
  raisedElev = 12;
  icons: IconDefinition[];
  constructor() { }

  ngOnInit(): void {
    this.icons = [faComments, faFlagUsa, faSquareRootAlt, faHiking, faTheaterMasks, faHandHoldingHeart, faRunning, faChild]
    this.scores = this.data.scores.map(score => {
      let remarks: string[] = score.notes3.split('·');

      return {
        courseName: score.courseName,
        remarks: remarks,
      }
    })
  }

}
