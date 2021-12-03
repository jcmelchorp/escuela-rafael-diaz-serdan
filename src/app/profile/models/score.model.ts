import { SchoolLevel } from "../../auth/models/user.enum";
import { Cycle } from '../../school/models/school-course.model';
export interface Score {
  id: string;
  cycle: Cycle;
  grade: SchoolLevel;
  isFinished?: boolean;
  notes?: string[];
  general_recomend?: string
  prom_final?: number;
  scores: ScoreListItem[];
  userId: string;
}
export interface ScoreListItem {
  courseName: string;
  unit1: string;
  unit2: string;
  unit3: string;
  notes1: string;
  notes2: string;
  notes3: string;
  recover1?: boolean;
  recover2?: boolean;
  recover3?: boolean;
  prom_materia: number;
  isCourseClosed: boolean;
}
