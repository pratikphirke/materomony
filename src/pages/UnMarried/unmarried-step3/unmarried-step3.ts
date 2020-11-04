import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { BusinessStep1Page } from '../../Business/business-step1/business-step1';
import { JobDetailsPage } from '../../Job/job-details/job-details';
import { TabsPage } from '../../tabs/tabs';

//@IonicPage()
@Component({
  selector: 'page-unmarried-step3',
  templateUrl: 'unmarried-step3.html',
})
export class UnmarriedStep3Page {

 
  register: FormGroup;
  formdata = new FormData();
  tearmError: boolean;
  jobselect: any;
  dataArray= {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {

    this.jobselect = this.navParams.get('jobselect');
    this.dataArray = this.navParams.get('dataArray');

  }

  ngOnInit() {

    this.register = new FormGroup({
      height: new FormControl('', [Validators.required,]),
      weight: new FormControl('', [Validators.required,]),
      skin: new FormControl('', [Validators.required,]),
      about: new FormControl('', [Validators.required,])
    });
  }


  goBack() {
    this.navCtrl.pop()
  }

  Register_Step3(data: any) {
    
    if (this.register.valid) {

     this.dataArray['height'] = data.height,
     this.dataArray['weight'] = data.weight,
     this.dataArray['skin'] = data.skin,
     this.dataArray['about'] = data.about


        console.log('*****Select Job**** ',this.jobselect)

      if(this.jobselect == "Business"){
        this.navCtrl.push(BusinessStep1Page, {dataArray: this.dataArray,
          jobselect:this.jobselect
        });
          
      }
         if(this.jobselect == "Job"){
            this.navCtrl.push(JobDetailsPage, {dataArray: this.dataArray,
              jobselect:this.jobselect
          });
        
          }
          if(this.jobselect == "Unemployed"){
            this.navCtrl.push(TabsPage, {dataArray: this.dataArray,
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

