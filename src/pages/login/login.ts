import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, Events, NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../providers/define/define';
import { GlobleServiceProvider } from '../../providers/globle-service/globle-service';
import { ServiceProvider } from '../../providers/service/service';
import { SplashProvider } from '../../providers/splash/splash';
import { OtpPage } from '../otp/otp';
import { TabsPage } from '../tabs/tabs';


//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  userdata: any;
  registeremail: any;
  uid: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ServiceProvider,
    public DefineProvider: DefineProvider,    public alertCtrl: AlertController, 
    public globle: GlobleServiceProvider, public events: Events,
    public splash: SplashProvider) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
   
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])

    });
  }

  ionViewDidLoad() {
    this.userdata = this.navParams.get('data');
    this.registeremail = this.navParams.get('email');
   // console.log('otp page data',this.userdata);
   // console.log('otp page otp',this.registeremail);

    //console.log('ionViewDidLoad LoginPage');
  }

  
  public login(data) {

    if (this.loginForm.valid) {
  
      let formdata = new FormData();
      formdata.append('email', data.email);
      this.splash.presentLoading();
      this.api.emailVerify(formdata).subscribe(res => {
        if (res.flag == 0) {
          this.splash.toast(res.data);
          this.splash.dismiss()
        }
        if (res.flag == 1) { 
         this.uid =res.user_id;

          // console.log('user id from api ',res.user_id);  
          // this.navCtrl.push(OtpPage, {id: res.user_id});
          this.splash.toast('email exist');
      
          //get otp if user uninstall app ,id: res.user_id
          this.api.emailOTP(formdata).subscribe(res => {
         //   console.log('SEND EMAIL OTP',res)
           
            if (res.flag == 3) {
              this.splash.dismiss()
            this.navCtrl.push(OtpPage, {data: data, otp: res.otp ,email: data,id:this.uid});
            }
            else{
              this.splash.toast('Login Successful');
              this.splash.dismiss()
              this.navCtrl.push(TabsPage, { email: data.email, data: res.data }, 
                { animate: true, direction: 'forward', duration: 500 });
          
            }
          });     
        }
          if (res.flag == 2) {
          this.splash.toast('Email Not Register');
          this.splash.dismiss();
        //get otp if new user
        this.api.emailOTP(formdata).subscribe(res => {
          console.log(res)
          if (res.flag == 3) {
           // console.log('flag 3 true OTP SEND');
          this.navCtrl.push(OtpPage, {data: data, otp: res.otp});
          }
        });


    //  this.navCtrl.push(TabsPage, { email: data.email, data: res.data }, { animate: true, direction: 'forward', duration: 500 });
        //this.navCtrl.push(StepOnePage, { email: data.email, data: res.data }, { animate: true, direction: 'forward', duration: 500 });
        }
        if (res.status == 3) {
          this.splash.dismiss()
          this.events.publish('logout');
        }
      });

    }
    else {
      console.log('form errr');

      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    }
  }
 
}
