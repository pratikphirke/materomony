import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { MarriedStepThreePage } from '../married-step-three/married-step-three';

//@IonicPage()
@Component({
  selector: 'page-married-step-two',
  templateUrl: 'married-step-two.html',
})
export class MarriedStepTwoPage {

  public url = "assets/imgs/profile.png";
 
  register: FormGroup;
  formdata = new FormData();
  tearmError: boolean;
  preData: any;
  dataStepOne: any;
  jobselect: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {

    this.jobselect = this.navParams.get('jobselect');
    console.log('jobselected Step two---',this.jobselect);

    this.dataStepOne = this.navParams.get('dataStepOne');
    console.log('DTAA STEp One',this.dataStepOne);

    this.formdata.append('auth_token', this.DefineProvider.getRnadomToken())

  }

  ngOnInit() {

    this.register = new FormGroup({
     
      noofBrothers: new FormControl('', [Validators.required,]),
         //  noofBrothers_name: new FormControl('', [Validators.required,]),
        //   noofBrothers_dob: new FormControl('', [Validators.required,]),
        //   noofBrothers_age: new FormControl('', [Validators.required,]),
       //    noofBrothers_marital_status: new FormControl('', [Validators.required,]),
          // noofBrothers_mobile: new FormControl('', [Validators.required,]),
      noofSister: new FormControl('', [Validators.required,]),
         //  noofSister_name: new FormControl('', [Validators.required,]),
         //  noofSister_dob: new FormControl('', [Validators.required,]),
         //  noofSister_age: new FormControl('', [Validators.required,]),
         //  noofSister_marital_status: new FormControl('', [Validators.required,]),
          // noofSister_mobile: new FormControl('', [Validators.required,]),

      manglik: new FormControl('', [Validators.required,]),
      kuldevi: new FormControl('', [Validators.required,]),
      gotra: new FormControl('', [Validators.required,])
  
     
    });
  }

  marrageRegister_Steptwo(data: any) {
   // this.navCtrl.push(MarriedStepThreePage);
    if (this.register.valid) {
      let formdata = new FormData();
       
    ///  formdata.append('', this.dataStepOne);
        formdata.append('noofBrothers', data.noofBrothers);
        formdata.append('noofSister', data.noofSister);
        formdata.append('manglik', data.manglik);
        formdata.append('kuldevi', data.kuldevi);
        formdata.append('gotra', data.gotra);
        formdata.append('jobselect',this.jobselect);

      
        this.navCtrl.push(MarriedStepThreePage, {dataStepTwo: data,
                                                dataStepOne: this.dataStepOne,
                                              jobselect:this.jobselect});
     
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
