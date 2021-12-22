import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AccountDomain } from '@rds-accounts/models/account-domain.model';

import { AdminApiService } from '@rds-admin/services/admin-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  newUser!: AccountDomain;
  links = ['usuarios', 'alumnos', 'grupos', 'usuario-grupo'];
  activeLink: any;
  background: ThemePalette = undefined;
  constructor(
    private adminApiService: AdminApiService,
  ) {
    this.adminApiService.handleAdminLoad();
  }

  ngOnInit(): void {

  }

}

