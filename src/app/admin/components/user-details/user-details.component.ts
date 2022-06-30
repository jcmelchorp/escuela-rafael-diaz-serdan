import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  AfterViewInit,
  OnInit,
  Input,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faIdBadge } from '@fortawesome/free-regular-svg-icons';

import { select, Store } from '@ngrx/store';
import { PhoneType } from '@rds-auth/models/user-parent.model';
import { User as AuthUser } from '@rds-auth/models/user.model';


import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  @Output() updatedUser = new EventEmitter<any>();
  userDetailsForm!: UntypedFormGroup;
  @Input()
  user!: AuthUser;
  raisedElev: number = 10;
  hasUnitNumber = false;
  faIdBadge = faIdBadge;
  states = [
    { clave: 'Ags', nombre: 'Aguascalientes' },
    { clave: 'Bc', nombre: 'Baja California' },
    { clave: 'Bcs', nombre: 'Baja California Sur' },
    { clave: 'Chi', nombre: 'Chihuahua' },
    { clave: 'Chs', nombre: 'Chiapas' },
    { clave: 'Cmp', nombre: 'Campeche' },
    { clave: 'Cmx', nombre: 'Ciudad De Mexico' },
    { clave: 'Coa', nombre: 'Coahuila' },
    { clave: 'Col', nombre: 'Colima' },
    { clave: 'Dgo', nombre: 'Durango' },
    { clave: 'Gro', nombre: 'Guerrero' },
    { clave: 'Gto', nombre: 'Guanajuato' },
    { clave: 'Hgo', nombre: 'Hidalgo' },
    { clave: 'Jal', nombre: 'Jalisco' },
    { clave: 'Mch', nombre: 'Michoacan' },
    { clave: 'Mex', nombre: 'Estado De Mexico' },
    { clave: 'Mor', nombre: 'Morelos' },
    { clave: 'Nay', nombre: 'Nayarit' },
    { clave: 'Nl', nombre: 'Nuevo Leon' },
    { clave: 'Oax', nombre: 'Oaxaca' },
    { clave: 'Pue', nombre: 'Puebla' },
    { clave: 'Qr', nombre: 'Quintana Roo' },
    { clave: 'Qro', nombre: 'Queretaro' },
    { clave: 'Sin', nombre: 'Sinaloa' },
    { clave: 'Slp', nombre: 'San Luis Potosi' },
    { clave: 'Son', nombre: 'Sonora' },
    { clave: 'Tab', nombre: 'Tabasco' },
    { clave: 'Tlx', nombre: 'Tlaxcala' },
    { clave: 'Tms', nombre: 'Tamaulipas' },
    { clave: 'Ver', nombre: 'Veracruz' },
    { clave: 'Yuc', nombre: 'Yucatan' },
    { clave: 'Zac', nombre: 'Zacatecas' },
  ];
  phoneKeys: any;
  phones!: PhoneType;
  userSub!: Subscription;
  constructor(private fb: UntypedFormBuilder) {
    this.initForm(this.user);
  }
  ngOnInit(): void { }
  initForm(defaultUser?: AuthUser) {
    this.userDetailsForm = this.fb.group({
      dayOfBirth: new UntypedFormControl(''),
      addressLine: new UntypedFormControl(''),
      postalCode: new UntypedFormControl(''),
      photoUrl: new UntypedFormControl(''),
      city: new UntypedFormControl(''),
      state: new UntypedFormControl(''),
      country: new UntypedFormControl(''),
      phoneHome: new UntypedFormControl(''),
      mobilePhone: new UntypedFormControl(''),
    });
  }
  onSubmit() {
    alert(
      'Todavia no estamos listos para actualizar tu información por esta via. Contácta a la dirección escolar para más detalles'
    );
  }
  updateUser() {
    this.updatedUser.emit(this.user);
  }
}
