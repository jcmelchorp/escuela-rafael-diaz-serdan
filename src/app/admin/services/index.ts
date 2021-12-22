import { GroupsResolver } from '../resolvers/groups.resolver';
import { AccountsDomainResolver } from '../resolvers/user-domain.resolver';
import { AdminApiService } from './admin-api.service';
//import { AdminFireService } from './admin-fire.service';
import { GroupsService } from './groups.service';

export const ADMIN_SERVICES: any[] = [
  AdminApiService,
  //AdminFireService,
  GroupsService,
  GroupsResolver,
  AccountsDomainResolver,
];

export * from '../resolvers/groups.resolver';
export * from '../resolvers/user-domain.resolver';
export * from './admin-api.service';
//export * from './admin-fire.service';
export * from './groups.service';
