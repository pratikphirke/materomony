import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { BusinessStep1Page } from '../../Business/business-step1/business-step1';
import { JobDetailsPage } from '../../Job/job-details/job-details';


//@IonicPage()
@Component({
  selector: 'page-married-step-three',
  templateUrl: 'married-step-three.html',
})
export class MarriedStepThreePage {

 
  register: FormGroup;
  formdata = new FormData();
  tearmError: boolean;
  jobselect: any;
  dataStepOne: any;
  dataStepTwo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {

    this.jobselect = this.navParams.get('jobselect');
    console.log('jobselected Step two---',this.jobselect);
    
    this.dataStepTwo = this.navParams.get('dataStepTwo');
    this.dataStepOne = this.navParams.get('dataStepOne');
    
    console.log('dataStepTwo',this.dataStepTwo);
    console.log('dataStepOne',this.dataStepOne);

  }

  ngOnInit() {

    this.register = new FormGroup({
      height: new FormControl('', [Validators.required,]),
      weight: new FormControl('', [Validators.required,]),
      skin: new FormControl('', [Validators.required,]),
      about: new FormControl('', [Validators.required,])
    });
  }

  marrageRegister_StepThree(data: any) {
    
    if (this.register.valid) {
      let formdata = new FormData();
       
    ///  formdata.append('', this.dataStepOne);
        formdata.append('height', data.height);
        formdata.append('weight', data.weight);
        formdata.append('skin', data.skin);
        formdata.append('about', data.about);
        formdata.append('jobselect',this.jobselect);
      
        console.log('*****Select Job**** ',this.jobselect)
      if(this.jobselect == "Business"){
        this.navCtrl.push(BusinessStep1Page, {dataStepThree: data, 
          dataStepTwo:this.dataStepTwo,
          dataStepOne:this.dataStepOne,
          jobselect:this.jobselect
        });
          
      }else{
        this.navCtrl.push(JobDetailsPage, {dataStepThree: data, 
          dataStepTwo:this.dataStepTwo,
          dataStepOne:this.dataStepOne,
          jobselect:this.jobselect
      });
           
          }
    
      }
      else {
        console.log('form errr');

        Object.keys(this.register.controls).forEach(field => {
          const control = this.register.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }
       }
  }

