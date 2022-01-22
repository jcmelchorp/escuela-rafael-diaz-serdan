import { SchoolCoursesService } from "./school-courses.service";
import { SchoolStudentsService } from "./school-students.service";
import { SchoolTeachersService } from './school-tearchers.service';
import { SchoolClassroomsService } from "./school-classrooms.service";
import { SchoolService } from './school.service';
import { SchoolCyclesService } from './school-cycles.service';

export const SCHOOL_SERVICES: any[] = [
  SchoolService,
  SchoolTeachersService,
  SchoolClassroomsService,
  SchoolCoursesService,
  SchoolStudentsService,
  SchoolCyclesService
];
export * from './school.service';
export * from "./school-courses.service";
export * from "./school-students.service";
export * from "./school-tearchers.service";
export * from "./school-classrooms.service";
export * from "./school-cycles.service";
