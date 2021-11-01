import { SchoolLevel } from "./user.enum";

export interface Score {
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
export interface Grade {
  cicleId: string;
  grade: SchoolLevel;
  isFinished?: boolean;
  notes?: string[];
  prom_final?: number;
  scores: Score[];
  userId: string;
}
