import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
/* import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { providePerformance, getPerformance } from '@angular/fire/performance'; */
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@rds-core/core.module';
import { SharedModule } from '@rds-shared/shared.module';
import { environment } from '@rds-env/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthModule } from '@rds-auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, PERSISTENCE, USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppStoreModule } from '@rds-root/app/store/app-store.module';


@NgModule({
  declarations: [
    AppComponent
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
    ServiceWorkerModule.register('gnaw-worker.js', {
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
    AngularFireModule.initializeApp(environment.firebase, 'sigio-rds'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    /*     const firebaseApp = initializeApp({ });
    const auth = getAuth();
    onAuthStateChanged(auth, user => { console.log(user); });
    provideAnalytics(() => getAnalytics()),
      provideAuth(() => getAuth()),
      provideDatabase(() => getDatabase()),
      provideFirestore(() => getFirestore()),
      providePerformance(() => getPerformance()), * /
      ],
    providers: [
      { provide: PERSISTENCE, useValue: 'session' },
      { provide: USE_DEVICE_LANGUAGE, useValue: true },
      /* ScreenTrackingService, UserTrackingService */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
