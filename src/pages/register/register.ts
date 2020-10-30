import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../providers/define/define';
import { ServiceProvider } from '../../providers/service/service';
import { SplashProvider } from '../../providers/splash/splash';
import { DivorseRegisterPage } from '../Divorse/divorse-register/divorse-register';
import { MarriedRegisterPage } from '../Married/married-register/married-register';
import { OtpPage } from '../otp/otp';



//@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  register: FormGroup;
  formdata = new FormData();
  tearmError: boolean;
  preData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {

    this.preData = this.navParams.get('data');
    console.log('predata',this.preData);
    this.formdata.append('auth_token', this.DefineProvider.getRnadomToken())

  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.register = new FormGroup({
      firstname: new FormControl('', [Validators.required,]),
      middlename: new FormControl('', [Validators.required,]),
      lastname: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      mobile1: new FormControl('', [Validators.required,]),
      mobile2: new FormControl('', [Validators.required,]),
      city: new FormControl('', [Validators.required,]),
      district: new FormControl('', [Validators.required,]),
      state: new FormControl('', [Validators.required,]),
      country: new FormControl('', [Validators.required,]),
      Present_Address: new FormControl('', [Validators.required,]),
      Permenent_Address: new FormControl('', [Validators.required,]),
      birthdate: new FormControl('', [Validators.required,]),
      age: new FormControl('', [Validators.required,]),
      gender: new FormControl('', [Validators.required,]),
      religion: new FormControl('', [Validators.required,]),
      caste: new FormControl('', [Validators.required,]),
      langknown: new FormControl('', [Validators.required,]),
      higheducation: new FormControl('', [Validators.required,]),
      annual_income: new FormControl('', [Validators.required,]),
      hobby: new FormControl('', [Validators.required,]),
      marital_status: new FormControl('', [Validators.required,]),
      profession: new FormControl('', [Validators.required,])
     
    });
  }

    signUp(data: any) {
    // if (!(data.status)) {
      if(data.marital_status=="UnMarried"){
        console.log('selected radio satatus',data.marital_status);
          this.navCtrl.push(MarriedRegisterPage)
         }else(
           this.navCtrl.push(DivorseRegisterPage)
         )
       
       if (this.register.valid) {
        //  this.tearmError = false;

     
          let formdata = new FormData();

          formdata.append('email', data.email);
        
          this.api.emailOTP(formdata).subscribe(res => {
            console.log(res)
            if (res.flag == 3) {
             // console.log('flag 3 true OTP SEND');
            this.navCtrl.push(OtpPage, {data: data, otp: res.otp});
            }
          });

       
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

