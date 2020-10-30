import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { UnmarriedStep2Page } from '../../UnMarried/unmarried-step2/unmarried-step2';
import { Sister5Page } from '../sister5/sister5';

//@IonicPage()
@Component({
  selector: 'page-sister4',
  templateUrl: 'sister4.html',
})
export class Sister4Page {

  register: FormGroup;
  formdata = new FormData();

  birthdate:any;
  SelectedSisCount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public splash: SplashProvider) {
      this.register = new FormGroup({
     

         noofSister_name: new FormControl('', [Validators.required,]),
        noofSister_dob: new FormControl('', [Validators.required,]),
        noofSister_age: new FormControl('', [Validators.required,]),
          noofSister_marital_status: new FormControl('', [Validators.required,]),
          noofSister_mobile: new FormControl('', [Validators.required,]),
  
      });
  }
      ionViewDidLoad() {

        this.SelectedSisCount = this.navParams.get('SelectedSisCount');
        console.log('--SelectedSisCount---',this.SelectedSisCount);

      }
    //--calculate age 
      public ageFromDateOfBirthday(birthdate: any): number {
        //  console.log('birthdate',birthdate);
          return moment().diff(birthdate, 'years');
        }
    //save Sister info
    SaveSistersInfo(data: any) {
      
    if (this.register.valid) {
  
      let formdata = new FormData();
        ///  formdata.append('', this.dataStepOne);
        formdata.append('noofSister_name', data.noofSister_name);
        formdata.append('noofSister_dob', data.noofSister_dob);
        formdata.append('noofSister_age', data.noofSister_age);
        formdata.append('noofSister_marital_status', data.noofSister_marital_status);
        formdata.append('noofSister_mobile', data.noofSister_mobile);
        formdata.append('SelectedSisCount',this.SelectedSisCount);

  
      console.log('--------------form data----------------- ',data)

      if(this.SelectedSisCount >='5'){
        //   console.log(' EQUAL go to next SELECTED BRO',this.SelectedBroCount)
           this.navCtrl.push(Sister5Page, {Sister1info: data,SelectedSisCount: this.SelectedSisCount});
   
         }else if(this.SelectedSisCount=='4'){
         //  console.log('go to home ',this.SelectedBroCount)
           this.navCtrl.push(UnmarriedStep2Page, {Sister1info: data,
                                                 SelectedSisCount: this.SelectedSisCount});
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
