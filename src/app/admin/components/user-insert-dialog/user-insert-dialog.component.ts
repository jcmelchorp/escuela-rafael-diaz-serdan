import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AccountDomain, UserInsert } from '@rds-accounts/models/account-domain.model';
import { AccountsDomainEntityService } from '@rds-store/accounts-domain/accounts-domain-entity.service';



import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Component({
  templateUrl: './user-insert-dialog.component.html',
  styleUrls: ['./user-insert-dialog.component.scss']
})
export class UserInsertDialogComponent implements OnInit {
  faTimes = faTimes;
  saveForm!: UntypedFormGroup;
  hide: boolean = true;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private dialogRef: MatDialogRef<UserInsertDialogComponent>,
    private accountsDomainEntityService: AccountsDomainEntityService,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();

  }
  initForm() {
    this.saveForm = this.fb.group({
      givenName: new UntypedFormControl('', [Validators.required]),
      familyName: new UntypedFormControl('', [Validators.required]),
      primaryEmail: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit() {
    this.loading$.next(true);
    //this.saveForm.disable();
    const tryUser: UserInsert = {
      name: {
        givenName: this.saveForm.get('givenName')?.value,
        familyName: this.saveForm.get('familyName')?.value
      },
      primaryEmail: this.saveForm.get('primaryEmail')?.value,
      password: this.saveForm.get('password')?.value
    };
    this.accountsDomainEntityService.add(tryUser as AccountDomain, { isOptimistic: false }).subscribe(
      user => { },
      err => { }
    );
  }
}
