import { AssignedCoursesService } from "./assigned-courses.service";
import { SchoolCoursesService } from "./school-courses.service";
import { SchoolStudentsService } from "./school-students.service";

export const SCHOOL_SERVICES: any[] = [AssignedCoursesService, SchoolCoursesService, SchoolStudentsService]
export * from "./school-courses.service";
export * from "./school-students.service";
