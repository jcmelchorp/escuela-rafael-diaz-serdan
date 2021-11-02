import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@rds-shared/shared.module';

import { UserProfileEffects } from '@rds-classroom/state/effects/user-profile.effects';

import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomComponent } from './classroom.component';

import { AnnouncementsModule } from './announcements/announcements.module';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';


@NgModule({
  declarations: [ClassroomComponent],
  imports: [
    SharedModule,
    ClassroomRoutingModule,
    UserProfilesModule,
    TeachersModule,
    CoursesModule,
    StudentsModule,
    AnnouncementsModule,
    EffectsModule.forFeature([UserProfileEffects])
  ],
  exports: [ClassroomComponent]
})
export class ClassroomModule { }
