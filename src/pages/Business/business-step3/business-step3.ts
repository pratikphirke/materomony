import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { GlobleServiceProvider } from '../../../providers/globle-service/globle-service';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { TabsPage } from '../../tabs/tabs';


//@IonicPage()
@Component({
  selector: 'page-business-step3',
  templateUrl: 'business-step3.html',
})
export class BusinessStep3Page {

  businessForm: FormGroup;
  dataArray = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public alertCtrl: AlertController,
    public splash: SplashProvider,
    public global: GlobleServiceProvider) {
    this.businessForm = new FormGroup({
   
      about: new FormControl(),
      turnover: new FormControl('', [Validators.required]),
      website: new FormControl(),
      linkedin: new FormControl(),
      facebook: new FormControl(),
      instagram: new FormControl()
     
    })
  }

    
  ionViewDidLoad() {
    this.dataArray = this.navParams.get('dataArray');
  }
  
  goBack() {
    this.navCtrl.pop()
  }

	

  submitDetails(data:any) {
    if (this.businessForm.valid) {

      this.dataArray['about'] = data.about,
      this.dataArray['turnover'] = data.turnover,
      this.dataArray['website'] = data.website,
      this.dataArray['linkedin'] = data.linkedin,
      this.dataArray['facebook'] = data.facebook,
      this.dataArray['instagram'] = data.instagram




     console.log('---------------BusinessStep3-----------',this.dataArray)
         // this.navCtrl.push(TabsPage, {dataArray: this.dataArray});
      /* this.api.signupFinal(this.dataArray).subscribe(res => {
          
          console.log('SIGNUP RESPONSE',res)
          if(res.flag == 0) {
            
            this.splash.toast(res.data);
            this.splash.dismiss();
          }
        
          if(res.flag == 6) {
            this.splash.toast(res.message);
           // this.navCtrl.push(TabsPage, {dataArray: this.dataArray});
          let formdata = new FormData();
            formdata.append('user_id', res.user_id);

            this.api.getAccountDetails(this.dataArray).subscribe(res => {
            
              console.log('**ACCOUNRTDETAILS',res)
              if(res.status == 'true') {  
                this.global.setUser(res.data)
                this.splash.dismiss();
                 this.navCtrl.push(TabsPage, {dataArray: this.dataArray});
              }
            })
          }
          if(res.flag == 7) {
            this.splash.toast('Registration Failed');
          }
        });
    
      
        }*/
          
      this.api.signupFinal(this.dataArray).subscribe(res => {
          
        console.log('SIGNUP RESPONSE',res)
        if(res.flag == 0) {
          this.splash.toast(res.message)        
        } else if(res.status == "true") {
          this.splash.toast(res.message)
          this.navCtrl.push(TabsPage, {dataArray: this.dataArray})
        } else if(res.flag == 7) {
          this.splash.toast('Registration failed')
        }
      });
    }
        else {
          console.log('form errr');
        
                Object.keys(this.businessForm.controls).forEach(field => {
                  const control = this.businessForm.get(field);
                  control.markAsTouched({ onlySelf: true });
                })
              }
           }
          }

