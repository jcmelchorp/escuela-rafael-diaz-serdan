import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '@rds-auth/models/user.model';
import * as fromUser from '.';
@Injectable({
  providedIn: 'root'
})
export class AccountsEntityService extends EntityCollectionServiceBase<User> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromUser.entityCollectionName, serviceElementsFactory);
  }
}
