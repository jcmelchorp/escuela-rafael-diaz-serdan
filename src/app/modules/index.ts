import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from './material.module';
export const uiModules: any[] = [
  MaterialModule,
  FlexLayoutModule,
  FontAwesomeModule,
];
export const commonModules: any[] = [
  CommonModule,
  RouterModule,
];
export const formsModules: any[] = [
  FormsModule,
  ReactiveFormsModule
];
export * from './material.module';
