import { LOCALE_ID, NgModule } from '@angular/core';
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
import { getApp, getApps, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, initializeAuth, indexedDBLocalPersistence, browserPopupRedirectResolver } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore, enableMultiTabIndexedDbPersistence, initializeFirestore } from '@angular/fire/firestore';
import { connectAuthEmulatorInDevMode, connectDatabaseEmulatorInDevMode, connectFirestoreEmulatorInDevMode } from '@rds-env/emulators';
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
let resolvePersistenceEnabled: (enabled: boolean) => void;
registerLocaleData(localeEs, "es");
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
      const auth = initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
      });
      if (environment.useAuthEmulator) {
        connectAuthEmulatorInDevMode(auth);
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useFirestoreEmulator) {
        connectFirestoreEmulatorInDevMode(firestore);
      }
      /* enableMultiTabIndexedDbPersistence(firestore).then(
        () => resolvePersistenceEnabled(true),
        () => resolvePersistenceEnabled(false)
      ); */
      return firestore;
    }),
    provideDatabase(() => {
      const database = getDatabase(getApp(),
        environment.useDatabaseEmulator ?
          'http://localhost:9000/?ns=escuela-rafael-diaz-serdan-default-rtdb' :
          'https://escuela-rafael-diaz-serdan-default-rtdb.firebaseio.com/');
      if (environment.useDatabaseEmulator) {
        connectDatabaseEmulatorInDevMode(database);
      }
      return database;
    })
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" }],
  bootstrap: [AppComponent]
})
export class AppModule { }


