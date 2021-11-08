import { ApplicationRef, Component, isDevMode } from '@angular/core';
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
export class AppComponent {
  title = 'escuela-rafael-diaz-serdan';
  constructor(appRef: ApplicationRef) {
    if (isDevMode()) {
      appRef.isStable
        .pipe(debounceTime(200), distinctUntilChanged())
        .subscribe((it) => {
          console.log('isStable', it);
        });
    }
  }
}
