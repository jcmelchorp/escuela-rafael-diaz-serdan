import { Component, OnInit } from '@angular/core';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { SchoolClassroomsEntityService } from '@rds-store/school/school-classrooms/school-classrooms-entity.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cycle, SchoolClassroom } from '../../models/school-course.model';

@Component({
  selector: 'app-school-classroom-list',
  templateUrl: './school-classroom-list.component.html',
  styleUrls: ['./school-classroom-list.component.scss']
})
export class SchoolClassroomListComponent implements OnInit {
  loaded$: Observable<boolean>;
  classrooms$: Observable<SchoolClassroom[]>;
  slevelKeys;
  slevels = SchoolLevel;
  cycleKeys;
  cycles = Cycle;
  constructor(
    private schoolClassroomsEntityService: SchoolClassroomsEntityService
  ) {
    this.cycleKeys = Object.keys(this.cycles);
    this.slevelKeys = Object.keys(this.slevels);
    this.loaded$ = this.schoolClassroomsEntityService.loaded$;
    this.classrooms$ = this.schoolClassroomsEntityService.entities$;
  }

  ngOnInit(): void {

  }

}
