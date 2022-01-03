import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { SchoolLevel } from '@rds-auth/models/user.enum';
import { Cycle, SchoolClassroom } from '@rds-school/models/school-course.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-school-classroom-list',
  templateUrl: './school-classroom-list.component.html',
  styleUrls: ['./school-classroom-list.component.scss']
})
export class SchoolClassroomListComponent implements OnInit/* , OnChanges */ {
  @Input() classrooms: SchoolClassroom[];
  @Output() onClassroomShow: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCycleChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  //filterClassrooms$: BehaviorSubject<SchoolClassroom[]> = new BehaviorSubject(null);
  cycles = Cycle;
  cycleKeys: string[];
  levels = SchoolLevel;
  levelKeys: string[];
  cyclesInUse: string[];
  selectedCycle: string = '';
  selectedIndex: number;
  constructor() { }


  ngOnInit(): void {
    this.cycleKeys = Object.keys(this.cycles);
    this.levelKeys = Object.keys(this.levels);
    //this.filterClassrooms$.next(null);
  }
  /* ngOnChanges(changes: SimpleChanges): void {
    const classroomChange: SimpleChange = changes.classrooms;
    if (classroomChange.currentValue) {
      this.filterClassrooms$.next(classroomChange.currentValue);
    }
  } */
  onSelectionChange() {
    this.onCycleChange.emit(this.selectedCycle);
  }
  showClassroom(classroomId: string) {
    this.onClassroomShow.emit(classroomId);
  }

}
