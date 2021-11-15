import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-scores-recommendation',
  templateUrl: './profile-scores-recommendations.component.html',
  styleUrls: ['./profile-scores-recommendations.component.scss']
})
export class ProfileScoresRecommendationComponent implements OnInit {
  @Input() data: string[];
  raisedElev: number = 10;
  recomendation: string[];
  constructor() {
    if (this.data) {
      this.recomendation = [...this.data.filter(r => r != null)];
    }
  }

  ngOnInit(): void {

  }

}
