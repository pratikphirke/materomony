import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { UrlProvider } from '../url/url';
import { DefineProvider } from '../define/define';
import 'rxjs/add/operator/map';
//import { Observable } from 'rxjs/Observable';
@Injectable()
export class ServiceProvider {
  serverURl: any;
  randomToken: any;
  emailOTPUrl: any;
  emailValidateUrl: any;
  signupFinalUrl: any;
  loginUrl: any;
  accountDetailsUrl: any;
  countriesUrl:any;
  stateUrl:any;
  cityUrl:any;
  languageUrl:any;

  constructor(public http: HttpClient, public events: Events,
    public urlProvider: UrlProvider, public DefineProvider: DefineProvider) {
  //  console.log('Hello ServiceProvider Provider');
    this.serverURl = this.urlProvider.serverUrl;
    this.emailOTPUrl = this.urlProvider.emailOtp;
    this.emailValidateUrl = this.urlProvider.emailVerify;
    this.signupFinalUrl = this.urlProvider.signupFinalUrl;
    this.loginUrl = this.urlProvider.loginUrl;
    this.accountDetailsUrl = this.urlProvider.AccountDetailsUrl;
    this.countriesUrl = this.urlProvider.countriesUrl;
    this.stateUrl = this.urlProvider.stateUrl;
    this.cityUrl = this.urlProvider.cityUrl;
    this.languageUrl = this.urlProvider.languageUrl;
  }
  public checkApi() {
    return (res: Response) => {
      if (res.status == 3) {
        //handle authorization errors
        //in this example I am navigating to login.
        console.log("Error_Token_Expired: redirecting to login.");
        this.events.publish('logout');
      }
      return (res);
    };



  }
  public emailOTP(formdata) {
    var result;

    result = this.http.post(this.serverURl + this.emailOTPUrl, (formdata)).map(this.checkApi());
  //  console.log('email otp result SERVICES',result);
    return result;
  }
  public emailVerify(formdata) {
    var result;

    result = this.http.post(this.serverURl + this.emailValidateUrl, (formdata)).map(this.checkApi());
    return result;
  }
 
  public signupFinal(formdata) {
    var result;
    console.log(formdata);
    
    result = this.http.post(this.serverURl + this.signupFinalUrl, (formdata)).map(this.checkApi());
   // console.log('registre service result',result);
    return result;
  }
  public login(formdata) {
    var result;

    result = this.http.post(this.serverURl + this.loginUrl, (formdata)).map(this.checkApi());
   // console.log('servce result',result);
    return result;
  }
  public getAccountDetails(formdata) {
    var result;

    result = this.http.post(this.serverURl + this.accountDetailsUrl, (formdata)).map(this.checkApi());
    //console.log('account details from service result',result);
    return result;
  }
  public getCountries() {
    var result;

    result = this.http.post(this.serverURl + this.countriesUrl, (null)).map(this.checkApi());
    //console.log('state from getCountries()-- ',result);
    return result;
  }
  public getState(formdata) {
    var result;

    result = this.http.post(this.serverURl + this.stateUrl, (formdata)).map(this.checkApi());
 // console.log('state from getState()-- ',result);
 return result;
  }
  public getCity(formdata) {
    var result;

    result = this.http.post(this.serverURl + this.cityUrl, (formdata)).map(this.checkApi());
  //  console.log('city from service result',result);
    return result;
  }
  public getLanguages() {
    var result;

    result = this.http.post(this.serverURl + this.languageUrl, (null)).map(this.checkApi());
  //  console.log('language from service result',result);
    return result;
  }
}
