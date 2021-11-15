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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideDatabase, getDatabase, connectDatabaseEmulator } from '@angular/fire/database';
import { provideFirestore, getFirestore, connectFirestoreEmulator, enableMultiTabIndexedDbPersistence } from '@angular/fire/firestore';
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
    ServiceWorkerModule.register('ngrx-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      easing: 'ease-in',
      closeButton: true,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      enableMultiTabIndexedDbPersistence(firestore).then(
        () => resolvePersistenceEnabled(true),
        () => resolvePersistenceEnabled(false)
      );
      return firestore;
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
