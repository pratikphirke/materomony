import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { UnmarriedStep2Page } from '../../UnMarried/unmarried-step2/unmarried-step2';
import { Children3Page } from '../children3/children3';

//@IonicPage()
@Component({
  selector: 'page-children2',
  templateUrl: 'children2.html',
})
export class Children2Page {

  register: FormGroup;
  formdata = new FormData();
  noofChildren:any;
  selectedChild: any;
  birthdate:any;
  SelectedChildCount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public splash: SplashProvider) {
      this.register = new FormGroup({
     
     //   noofChildren: new FormControl('', [Validators.required,]),
        noofChildren_name: new FormControl('', [Validators.required,]),
        noofChildren_dob: new FormControl('', [Validators.required,]),
        noofChildren_age: new FormControl('', [Validators.required,]),
        noofChildren_gender: new FormControl('', [Validators.required,]),
        noofChildren_marital_status: new FormControl('', [Validators.required,])

      });
  }
  ionViewDidLoad() {

    this.SelectedChildCount = this.navParams.get('SelectedChildCount');
    console.log('--SelectedChildCount---',this.SelectedChildCount);

  }
  //--calculate age 
    public ageFromDateOfBirthday(birthdate: any): number {
      //  console.log('birthdate',birthdate);
        return moment().diff(birthdate, 'years');
      }
    //save children info
    SaveChildrensInfo(data: any) {
      
        if (this.register.valid) {
          let formdata = new FormData();
       
          ///  formdata.append('', this.dataStepOne);
              formdata.append('noofChildren_name', data.noofChildren_name);
              formdata.append('noofChildren_dob', data.noofChildren_dob);
              formdata.append('noofChildren_dob', data.noofChildren_dob);
              formdata.append('noofChildren_gender', data.noofChildren_gender);
              formdata.append('noofChildren_marital_status', data.noofChildren_marital_status);
              formdata.append('SelectedChildCount',this.SelectedChildCount);
      
        
            console.log('--------------form data----------------- ',data)
            if(this.SelectedChildCount >='3'){
           //   console.log(' EQUAL go to next SELECTED BRO',this.SelectedBroCount)
              this.navCtrl.push(Children3Page, {Child1Info: data,SelectedChildCount: this.SelectedChildCount});
      
            }else if(this.SelectedChildCount=='2'){
            //  console.log('go to home ',this.SelectedBroCount)
              this.navCtrl.push(UnmarriedStep2Page, {Brother1info: data,
                                                    SelectedChildCount: this.SelectedChildCount});
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

