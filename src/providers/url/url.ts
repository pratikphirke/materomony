import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UrlProvider {

  serverUrl: string =  'https://moderni-projects.in/projects/codeigniter/portfolio/api/'
  // serverUrl: string = 'http://moderni-projects.in/projects/codeigniter/portfolio/api/authentication/check_email_exist'
  loginUrl: string;
  emailOtp: any;
  emailVerify: any;
 signupFinalUrl: any;
 AccountDetailsUrl: any;
 countriesUrl:any;
 stateUrl:any;
 cityUrl :any;
 languageUrl: any;
  constructor(public http: HttpClient) {
   // console.log('Hello UrlProvider Provider');

    this.loginUrl = 'mobile/login';
    this.emailOtp = 'authentication/generate_otp';
    this.emailVerify = 'authentication/check_email_exist';
    this.signupFinalUrl = 'authentication/registration';
    this.AccountDetailsUrl = 'authentication/get_account_details';
    this.countriesUrl = 'authentication/get_countries';
    this.stateUrl = 'authentication/get_state';
    this.cityUrl = 'authentication/get_city';
    this.languageUrl = 'authentication/get_languages';
  }

}
