
import { SeoService } from './seo.service';
import { SnackService } from './snack.service';
import { SnackbarService } from './snackbar.service';
import { SubscriptionService } from './subscription.service';

export const sharedServices: any[] = [

  SeoService,
  SnackService,
  SubscriptionService,
  SnackbarService,
];
export * from './seo.service';
export * from './snack.service';
export * from './subscription.service';
export * from './snackbar.service';


