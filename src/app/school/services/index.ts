import { SchoolCoursesService } from "./school-courses.service";
import { SchoolStudentsService } from "./school-students.service";
import { SchoolTeachersService } from './school-tearchers.service';
import { SchoolClassroomsService } from "./school-classrooms.service";

export const SCHOOL_SERVICES: any[] = [
  SchoolTeachersService,
  SchoolClassroomsService,
  SchoolCoursesService,
  SchoolStudentsService
];
export * from "./school-courses.service";
export * from "./school-students.service";
export * from "./school-tearchers.service";
export * from "./school-classrooms.service";
