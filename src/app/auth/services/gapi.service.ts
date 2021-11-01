import { Injectable } from '@angular/core';
import { environment } from '@rds-env/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { from, Observable, of } from 'rxjs';
import {
  map,
  mergeMap,
  switchMap,
  exhaustMap,
  concatMap,
} from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable()
export class GapiService {
  private _googleAuth!: gapi.auth2.GoogleAuth;
  private _googleUser!: gapi.auth2.GoogleUser;
  constructor(public readonly authService: AuthService) { }
  handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('auth2:client', {
      callback: () => this.initClient(),
      onerror: () =>
        // Handle loading error.
        confirm('gapi.client failed to load!'),
      timeout: 15000, // 15 seconds.
      ontimeout: () =>
        // Handle timeout.
        confirm('gapi.client could not load in a timely manner!'),
    });
  }

  initClient() {
    const params = {
      clientId: environment.gapi.clientId,
      scope: environment.gapi.authScopes,
      apiKey: environment.firebase.apiKey,
      discoveryDocs: environment.gapi.discoveryDocs,
    };
    // Initialize the gapi.client object
    gapi.client.init(params).then(() => {
      //this.isClientLoaded = true;
      // Listen for sign-in state changes.
      this._googleAuth = gapi.auth2.getAuthInstance();
      this._googleAuth.isSignedIn.listen(() =>
        this._googleAuth.isSignedIn.get()
      );
      // Handle initial sign-in state. (Determine if user is already signed in.)
      this._googleUser = this.setSigninStatus(
        gapi.auth2.getAuthInstance().currentUser.get()
      );
    });
  }
  /*   handleClientLoad() {
      // Load the API's client and auth2 modules.
      // Call the initClient function after the modules load.
      gapi.load('client:auth2', {
        callback: () => this.initClient(),
        onerror: () =>
          // Handle loading error.
          confirm('gapi.client failed to load!'),
        timeout: 15000, // 15 seconds.
        ontimeout: () =>
          // Handle timeout.
          confirm('gapi.client could not load in a timely manner!'),
      });
    }
    initClient() {
      const params = {
        clientId: environment.gapi.clientId,
        scope: environment.gapi.authScopes,
        apiKey: environment.firebase.apiKey,
        discoveryDocs: environment.gapi.discoveryDocs,
      };
      // Initialize the gapi.client object
      gapi.client.init(params).then(() => {
        //this.isClientLoaded = true;
        // Listen for sign-in state changes.
        this._googleAuth = gapi.auth2.getAuthInstance();
        this._googleAuth.isSignedIn.listen(this.setSigninStatus);

        this._googleUser = gapi.auth2.getAuthInstance().currentUser.get();
        this.setSigninStatus;
      });
    } */
  /* updateSigninStatus = () => this.setSigninStatus;

  setSigninStatus = () =>
    this._googleAuth.currentUser
      .get()
      .hasGrantedScopes(environment.gapi.authScopes); */

  /**
  * Handler method for Authorize button
  */
  /*
  handleSignInClick(): Observable<any> {
    return this.authService.getAuthUser().pipe(
      switchMap((user) => {
        if (!user) {
          return from(this.signIn()).pipe(
            switchMap(() => this.authService.getAuthUser())
          );
        }
        return of(user);
      })
    );
  }
  async signIn() {
    this._googleUser = await gapi.auth2.getAuthInstance().signIn();
    const authResponse: gapi.auth2.AuthResponse =
      this._googleUser.getAuthResponse();
    const credential: firebase.auth.AuthCredential =
      firebase.auth.GoogleAuthProvider.credential(
        authResponse.id_token,
        authResponse.access_token
      );
    return await this.authService.signInWithCredential(credential);
  } */
  /**
     * Handler method for Authorize button
     */
  handleSignInClick() {
    return from(this.signIn());
  }
  async signIn() {
    this._googleUser = await this._googleAuth.signIn();
    const authResponse: gapi.auth2.AuthResponse =
      this._googleUser.getAuthResponse(true);
    const credential: firebase.auth.AuthCredential =
      firebase.auth.GoogleAuthProvider.credential(
        authResponse.id_token,
        authResponse.access_token
      );
    return await this.authService.signInWithCredential(credential);
  }
  /* signOut(id: string) {
    gapi.auth2.getAuthInstance().signOut();
    return this.accountsService
      .updateOnlineStatus(id, false)
      .pipe(switchMap(() => this.accountsService.signOut()));
  } */
  /*  updateSigninStatus = (isSignIn: boolean) => {
    if (isSignIn) {
      return true;
    } else {
      return false;
    }
  };
  setSigninStatus(googleUser: gapi.auth2.GoogleUser) {
    const isAuthorized = this.updateSigninStatus(
      this._googleUser.hasGrantedScopes(environment.gapi.authScopes)
    );
    if (isAuthorized) {
      this._googleUser;
      return this._googleUser;
    } else {
      alert('You have not authorized this app or you are signed out.');
      return null;
    }
  } */

  disconnect() {
    this._googleAuth.disconnect();
  }

  async signOut(id: string) {
    const auth2 = gapi.auth2.getAuthInstance();
    return await auth2.signOut();
  }

  setSigninStatus(googleUser: gapi.auth2.GoogleUser) {
    const isAuthorized = this.updateSigninStatus(googleUser);
    if (isAuthorized) {
      /* alert('You are currently signed in and have granted access to this app.');
      alert(googleUser.getGrantedScopes()) */
      return googleUser;
    } else {
      /* alert('You have not authorized this app or you are signed out.'); */
      return null;
    }
  }

  updateSigninStatus(user: gapi.auth2.GoogleUser) {
    return user.hasGrantedScopes(environment.gapi.authScopes);
  }

  getAuth(): Observable<gapi.auth2.GoogleAuth> {
    this._googleAuth = gapi.auth2.getAuthInstance();
    return from(this._googleAuth);
  }
}
