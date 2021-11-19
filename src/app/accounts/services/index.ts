import { AccountsService } from './accounts.service';
import { AccountsDomainService } from './accounts-domain.service'
export const ACCOUNTS_SERVICES: any[] = [AccountsService, AccountsDomainService];
export * from './accounts.service';
export * from './accounts-domain.service';
