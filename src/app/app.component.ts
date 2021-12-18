import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sso-app';
  constructor(private oAuthService : OAuthService){
    this.configureSingleSignOn();
  }
  configureSingleSignOn() {
    //this.oAuthService.initImplicitFlow();
    this.oAuthService.configure(authConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndLogin(); 
  }

  // logout() {
  //   this.oAuthService.logOut();
  // }
  get token() {
    let claims:any = this.oAuthService.getIdentityClaims();
    return claims ? claims : null;
  }
}
