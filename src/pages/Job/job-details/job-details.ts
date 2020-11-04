import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { GlobleServiceProvider } from '../../../providers/globle-service/globle-service';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { TabsPage } from '../../tabs/tabs';


//@IonicPage()
@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
})
export class JobDetailsPage {
  jobDetailsForm: FormGroup;

  jobselect: any;
  maritalStatusselect: any;
  dataArray= {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public alertCtrl: AlertController,
    public splash: SplashProvider,
    public global: GlobleServiceProvider) {

    this.jobDetailsForm = new FormGroup({
      experience: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      achievements: new FormControl('', [Validators.required]),
      awards: new FormControl('', [Validators.required]),
      noticePeriod: new FormControl('', [Validators.required]),
      totalExperience: new FormControl('', [Validators.required]),
      currentSalary: new FormControl('', [Validators.required]),
      expectedSalary: new FormControl('', [Validators.required])
    })
  }

  ionViewDidLoad() {
    this.dataArray = this.navParams.get('dataArray');
    this.jobselect = this.navParams.get('jobselect');
    this.maritalStatusselect = this.navParams.get('maritalStatusselect');
  }

  submitDetails(data:any) {
    if (this.jobDetailsForm.valid) {

        this.dataArray['experience'] = data.experience,
        this.dataArray['company'] = data.company,
        this.dataArray['achievements'] = data.achievements,
        this.dataArray['awards'] = data.awards,
        this.dataArray['noticePeriod'] = data.noticePeriod,
        this.dataArray['totalExperience'] = data.totalExperience,
        this.dataArray['currentSalary'] = data.currentSalary,
        this.dataArray['expectedSalary'] = data.expectedSalary

     ////   let formdata = new FormData();
      ///  formdata.append('data',this.dataArray);
      console.log('--------------Job data----------------- ',this.dataArray);
      //this.navCtrl.push(TabsPage, {dataArray: this.dataArray});

  
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
       /* 
    if(res.flag == 0) {
            
            this.splash.toast(res.data);
            this.splash.dismiss();
          }
        
          if(res.status == 'true') {
            this.splash.toast(res.message);
            let formdata = new FormData();
            formdata.append('user_id', res.user_id);

           // this.navCtrl.push(TabsPage, {dataArray: this.dataArray});
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
        });*/
      }
     
      
      else {
        console.log('form errr');

        Object.keys(this.jobDetailsForm.controls).forEach(field => {
          const control = this.jobDetailsForm.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }
       }
  }


