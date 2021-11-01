import { DialogEffects } from './dialog.effects';
import { SnackEffects } from './snack.effects';
import { SpinnerEffects } from './spinner.effects';
import { RouteEffects } from '../router/route.effects';
import { AppEffects } from './app.effects';
import { NgrxToastService } from './../services/ngrx-toast.service';

export const registeredEffects = [
  AppEffects,
  DialogEffects,
  RouteEffects,
  SnackEffects,
  SpinnerEffects,
  NgrxToastService,
];
export * from '../router/route.effects';
export * from './dialog.effects';
export * from './spinner.effects';
export * from './snack.effects';
export * from './../services/ngrx-toast.service';
export * from './app.effects';
