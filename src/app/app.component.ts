import { ApplicationRef, Component, isDevMode, OnInit } from '@angular/core';
import { SeoService } from '@rds-shared/services';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
  <ngx-spinner
      name="entitySpinner"
      bdColor="rgba(0, 0, 0, 0.7)"
      size="medium"
      color="primary"
      type="ball-clip-rotate"
      [fullScreen]="true">
    <p style="color: white">Buscando...</p>
  </ngx-spinner>
  <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title = 'Escuela RDS';
  constructor(private seoService: SeoService) {
  }
  ngOnInit(): void {
    this.seoService.titleInit();
    this.seoService.generateTags({
      title: this.title,
      description: 'Aplicación de servicios escolares de la Escuela Rafael Díaz Serdán - Educación para la vida. Ubicada en la ciudad y puerto de Veracruz, México',
      image: 'assets/screenshots/screenshot02.png'
    });
  }

}
