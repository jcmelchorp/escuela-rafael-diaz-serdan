import { NgrxToastService } from './../ngrx-toast.service';
import { DialogEffects } from '../effects/dialog.effects';
import { SnackEffects } from '../effects/snack.effects';
import { SpinnerEffects } from '../effects/spinner.effects';
import { RouteEffects } from '../router/route.effects';
import { AppEffects } from '../effects/app.effects';

export const registeredEffects = [
  AppEffects,
  DialogEffects,
  RouteEffects,
  SnackEffects,
  SpinnerEffects,
  NgrxToastService,
];
export * from '../router/route.effects';
export * from '../effects/dialog.effects';
export * from '../effects/spinner.effects';
export * from '../effects/snack.effects';
export * from '../ngrx-toast.service';
export * from '../effects/app.effects';
