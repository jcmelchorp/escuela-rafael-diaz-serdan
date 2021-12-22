import { AdminComponent } from './admin/admin.component';
import { GroupsComponent } from './groups/groups.component';
import { SchoolHomeComponent } from './school-home/school-home.component';
import { UsersDomainComponent } from './users-domain/users-domian.component';


export const ADMIN_CONTAINERS: any[] = [
  AdminComponent,
  GroupsComponent,
  UsersDomainComponent,
  SchoolHomeComponent
];

export * from './admin/admin.component';
export * from './groups/groups.component';
export * from './school-home/school-home.component';
export * from './users-domain/users-domian.component';

