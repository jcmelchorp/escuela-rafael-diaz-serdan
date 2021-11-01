import { AuthService } from './auth.service';
import { GapiService } from './gapi.service';
export const authServices: any[] = [AuthService, GapiService];
export * from './auth.service';
export * from './gapi.service';
