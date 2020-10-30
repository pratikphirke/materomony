import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


export class User {
  active: string;
  auth_key: string;
  email: string;
  first_name: string;
  phone: string;
  gender: any;
  id: any;
  mobile: any;
  dob: any;
  last_name: any;


  constructor(response) {
   // this.active = response.active;
   // this.auth_key = response.auth_key;
    this.email = response.email;
    this.first_name = response.first_name;
    this.last_name = response.last_name;
    this.mobile = response.mobile;
    this.gender = response.gender;
    this.id = response.id;
    this.dob = response.dob;
 
  }
}
@Injectable()
export class GlobleServiceProvider {
  currentUser: any;
  active: string;
  auth_key: string;
  email: string;
  first_name: string;
  last_name: string;
  mobile: string;
  gender: any;
  id: any;
dob:any;

  constructor(public http: HttpClient) {
   // console.log('Hello GlobleServiceProvider Provider');
  }
  public setUser(response) {
  //  console.log('SET USER CALLED',response);
  //  this.active = response.active;
   // this.auth_key = response.auth_key;
    this.email = response.emailid;
    this.first_name = response.firstname;
    this.last_name = response.lastname;
    this.mobile = response.mobile;
    this.gender = response.gender;
    this.id = response.id;
    this.dob = response.dob;

    window.localStorage.setItem('email', response.emailid);
    window.localStorage.setItem('first_name', response.firstname);
    window.localStorage.setItem('last_name', response.lastname);
    window.localStorage.setItem('mobile', response.mobile);
    window.localStorage.setItem('gender', response.gender);
    window.localStorage.setItem('id', response.id);
    window.localStorage.setItem('dob', response.dob);
    window.localStorage.setItem('response', JSON.stringify(response));
    this.currentUser = new User(response);
  
  }
  public getUserInfo(): User {
  //  console.log('Current USER',this.currentUser);
    return this.currentUser;
  }
  public setGlobleVariable() {
 
    this.email = window.localStorage.getItem('email');
    this.first_name = window.localStorage.getItem('first_name');
    this.last_name = window.localStorage.getItem('last_name');
    this.mobile = window.localStorage.getItem('mobile');
    this.gender = window.localStorage.getItem('gender');
    this.id = window.localStorage.getItem('id');
    this.dob = window.localStorage.getItem('dob');

    this.currentUser = new User(JSON.parse(window.localStorage.getItem('response')));
  }
  public logout() {
    return Observable.create(observer => {
      window.localStorage.clear();
      this.currentUser = "";
     // this.active = "";
    //  this.auth_key = "";
      this.email = "";
      this.first_name = "";
      this.last_name = "";
      this.mobile = "";
      this.gender = "";
      this.id = "";
      this.dob = "";
      observer.next(true);
      observer.complete();
    });
  }

}
