import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@rds-core/core.module';
import { SharedModule } from '@rds-shared/shared.module';
import { environment } from '@rds-env/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthModule } from '@rds-auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { AppStoreModule } from '@rds-store/app-store.module';
import { AlertModule } from 'ngx-bootstrap/alert'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideDatabase, getDatabase, connectDatabaseEmulator } from '@angular/fire/database';
import { provideFirestore as provideFirestorms, getFirestore as getFirestorms, connectFirestoreEmulator as connectFirestormsEmulator, enableMultiTabIndexedDbPersistence } from '@angular/fire/firestore';
let resolvePersistenceEnabled: (enabled: boolean) => void;

export const persistenceEnabled = new Promise<boolean>(resolve => {
  resolvePersistenceEnabled = resolve;
});
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppStoreModule,
    CoreModule,
    SharedModule.forRoot(),
    AuthModule.forRoot(),
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:5000'
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      easing: 'ease-in',
      closeButton: true,
    }),
    AlertModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      return auth;
    }),
    provideFirestorms(() => {
      const firestones = getFirestorms();
      if (environment.useEmulators) {
        connectFirestormsEmulator(firestones, 'localhost', 8080);
      }
      enableMultiTabIndexedDbPersistence(firestones).then(
        () => resolvePersistenceEnabled(true),
        () => resolvePersistenceEnabled(false)
      );
      return firestones;
    }),
    provideDatabase(() => {
      const database = getDatabase();
      if (environment.useEmulators) {
        connectDatabaseEmulator(database, 'localhost', 9000);
      }
      return database;
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
