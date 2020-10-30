import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { UnmarriedStep2Page } from '../../UnMarried/unmarried-step2/unmarried-step2';
import { Brother4Page } from '../brother4/brother4';


//@IonicPage()
@Component({
  selector: 'page-brother3',
  templateUrl: 'brother3.html',
})
export class Brother3Page {

  register: FormGroup;
  formdata = new FormData();

  birthdate:any;
  SelectedBroCount: any;
  Brother1info: any;
  Brother2info: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public splash: SplashProvider) {
      this.register = new FormGroup({
     
       /// noofBrothers: new FormControl('', [Validators.required,]),
             noofBrothers_name: new FormControl('', [Validators.required,]),
            noofBrothers_dob: new FormControl('', [Validators.required,]),
            noofBrothers_age: new FormControl('', [Validators.required,]),
            noofBrothers_marital_status: new FormControl('', [Validators.required,]),
             noofBrothers_mobile: new FormControl('', [Validators.required,])
  
      });
  }
  ionViewDidLoad() {

    this.SelectedBroCount = this.navParams.get('SelectedBroCount');
    console.log('--SelectedBroCount---',this.SelectedBroCount);
    this.Brother1info = this.navParams.get('Brother1info');
    console.log('--Brother1info---',this.Brother1info);
    this.Brother2info = this.navParams.get('Brother2info');
    console.log('--Brother2info---',this.Brother2info);

  }

//--calculate age 
  public ageFromDateOfBirthday(birthdate: any): number {
    //  console.log('birthdate',birthdate);
      return moment().diff(birthdate, 'years');
    }

//save brother info
    SaveBrotherInfo(data: any) {
  
    if (this.register.valid) {
      let formdata = new FormData();
       
    ///  formdata.append('', this.dataStepOne);
        formdata.append('noofBrothers_name', data.noofBrothers_name);
        formdata.append('noofBrothers_dob', data.noofBrothers_dob);
        formdata.append('noofBrothers_age', data.noofBrothers_age);
        formdata.append('noofBrothers_marital_status', data.noofBrothers_marital_status);
        formdata.append('noofBrothers_mobile', data.noofBrothers_mobile);
        formdata.append('SelectedBroCount',this.SelectedBroCount);

        //append brother previous data
        formdata.append('Brother1info', this.Brother1info);
        formdata.append('Brother2info', this.Brother2info);
       // formdata.append('Brother3info', this.Brother3info);
       // formdata.append('Brother4info', this.Brother4info);
        // formdata.append('Brother5info', this.Brother5info);
      // formdata.append('SelectedBroCount', this.SelectedBroCount);

      console.log('--------------form data----------------- ',data)
      if(this.SelectedBroCount >='4'){
     //   console.log(' EQUAL go to next SELECTED BRO',this.SelectedBroCount)
        this.navCtrl.push(Brother4Page, {Brother3info: data,
                                      //  Brother1info: this.Brother1info,  
                                       // Brother2info: this.Brother2info,
                                       // SelectedBroCount: this.SelectedBroCount
                                      });

      }else if(this.SelectedBroCount=='3'){
      //  console.log('go to home ',this.SelectedBroCount)
        this.navCtrl.push(UnmarriedStep2Page, {Brother3info: data,
                                             // Brother1info: this.Brother1info,  
                                             // Brother2info: this.Brother2info,
                                            //  SelectedBroCount: this.SelectedBroCount
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


