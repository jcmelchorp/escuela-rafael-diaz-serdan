import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Score } from '@rds-profile/models/score.model';
export class AssignGrade {
  userId!: string;
  score!: Score;

  static asFormGroup(assignGrade: AssignGrade): FormGroup {
    const fg = new FormGroup({
      userId: new FormControl(assignGrade, Validators.required),
      score: new FormControl(assignGrade, Validators.required),
    });
    return fg;
  }
}
