import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { GlobleServiceProvider } from '../../providers/globle-service/globle-service';
import { ServiceProvider } from '../../providers/service/service';
import { SplashProvider } from '../../providers/splash/splash';
import { StepOnePage } from '../register/step-one/step-one';
import { TabsPage } from '../tabs/tabs';



//@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  otpForm: FormGroup;
  userData: any;
  serverOtp: any;
  email: any;
  id: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ServiceProvider,
    public alertCtrl: AlertController,
    public splash: SplashProvider,
    public global: GlobleServiceProvider
    ) {
      
    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required]),
    });
  }

  ionViewDidLoad() {
   console.log('ionViewDidLoad OtpPage');
   this.email = this.navParams.get('email');
   this.id = this.navParams.get('id');
   this.userData =  this.navParams.get('data');
   this.serverOtp =  this.navParams.get('otp');

    const alert = this.alertCtrl.create({
      title: 'SERVER  OTP',
      subTitle: '=  '+this.serverOtp,
      buttons: ['OK']
    });
    alert.present();


  
   console.log('user Data ', this.userData)
   console.log('OTP ', this.serverOtp)
  }
   //registration  flow

   public verifyOtp(data) {
    // console.log('Registration Flow');
     if(this.otpForm.valid) {
      // console.log('Entered otp', data.otp)
       if(this.serverOtp == data.otp) {
       //  console.log('OTP1', this.serverOtp, 'OTP2', data.otp);
         this.splash.toast(this.serverOtp);
       //  console.log('signup OtpPage--',this.userData.email);
         this.navCtrl.push(StepOnePage, { email: this.userData.email },
              { animate: true, direction: 'forward', duration: 500 });
 
       }
     }
      /*   let formdata = new FormData();
         formdata.append('firstname', this.userData.firstname);
         formdata.append('lastname', this.userData.lastname);
         formdata.append('email', this.userData.email);
         formdata.append('mobile', this.userData.mobile);
         formdata.append('gender', this.userData.gender);
         formdata.append('dob', this.userData.birthdate);
         this.splash.presentLoading();
 
         this.api.signupFinal(formdata).subscribe(res => {
           
          // console.log(res)
           if(res.flag == 0) {
             
             this.splash.toast(res.data);
             this.splash.dismiss();
           }
         
           if(res.flag == 6) {
             this.splash.toast(res.message);
             let formdata = new FormData();
             formdata.append('user_id', res.user_id);
 
             this.api.getAccountDetails(formdata).subscribe(res => {
             
              // console.log(res)
               if(res.status == 'true') {  
                 this.global.setUser(res.data)
                 this.splash.dismiss();
                 this.navCtrl.push(TabsPage)
               }
             })
           }
           if(res.flag == 7) {
             this.splash.toast('Registration Failed');
           }
         });
       }
     }
     else {
       console.log('form errr');
 
       Object.keys(this.otpForm.controls).forEach(field => {
         const control = this.otpForm.get(field);
         control.markAsTouched({ onlySelf: true });
       })
     }*/
    
   }
  //login flow

  verifyLoginOtp(data) {
    console.log('Login Flow');
    if(this.otpForm.valid) {
    
      if(data.otp == this.serverOtp) {
       // console.log('otp matched data otp',data.otp+'SERVERE otp',this.serverOtp);
        let formdata = new FormData();
        console.log('get id ',this.id);
        formdata.append('user_id', this.id)
        this.splash.presentLoading();
        this.api.getAccountDetails(formdata).subscribe(res => {
        
          console.log('GET ACCOUNT DETAILS',res.data)
          if(res) {
            this.global.setUser(res.data);
            this.splash.dismiss();
            this.navCtrl.push(TabsPage)
          }
        })
      }else {
        this.splash.toast('Invalid Otp');
      }
    }
  }
}
