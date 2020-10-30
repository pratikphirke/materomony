import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { StepThreePage } from '../step-three/step-three';

//@IonicPage()
@Component({
  selector: 'page-step-two',
  templateUrl: 'step-two.html',
})
export class StepTwoPage {

  register: FormGroup;
  formdata = new FormData();

  dataArray = {};
  countries:any =[];
  states: any=[];
  cities: any=[];

  selectedCountry = 0;
  selectedState = 0;
  selectedCity=0;
  global: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {
    this.countries = this.navParams.get('countries');
    this.dataArray = this.navParams.get('dataArray');
  }
  ngOnInit() {

    this.register = new FormGroup({
      city: new FormControl('', [Validators.required,]),
    //  district: new FormControl('', [Validators.required,]),
      state: new FormControl('', [Validators.required,]),
      country: new FormControl('', [Validators.required,]),
      Present_Address: new FormControl('', [Validators.required,]),
      Permenent_Address: new FormControl('', [Validators.required,])

    });
  }

  public  onSelectCountry(country_id){
      let formdata = new FormData();
      formdata.append('country_id', country_id.id);
      this.splash.presentLoading();
      this.api.getState(formdata).subscribe(res => {
        this.splash.dismiss()
        this.states = res.data;
          
      })
    }

  onSelectState(state) {
    let formdata = new FormData();
     formdata.append('state_id', state.id);
     this.splash.presentLoading();
    this.api.getCity(formdata).subscribe(res => {
      this.splash.dismiss()
      this.cities = res.data;
    })
  }

  onSelectCity(city) {
    //console.log('--------------------Selected City-------------', city.id);
  }

   
  
  goBack() {
    this.navCtrl.pop()
  }
 
  Register_Steptwo(data) {

    if (this.register.valid) {;

   /*    this.step2data=[{
           
            country: data.country.id,
            state: data.state.id,
            city: data.city.id,
          Present_Address: data.Present_Address,
          Permenent_Address: data.Permenent_Address   
       }]

       let data2 = this.dataArray.map((o,i)=>
       ({...o, ...this.step2data[i]})
       );
        */ 


      this.dataArray['country'] = data.country.id,
      this.dataArray['state'] = data.state.id,
      this.dataArray['city'] = data.city.id,
      this.dataArray['Present_Address'] = data.Present_Address,
      this.dataArray['permanent_address'] = data.Permenent_Address,
     
  
     console.log('--------------form data2222----------------- ',this.dataArray);
      this.navCtrl.push(StepThreePage, {dataArray: this.dataArray});
       /* this.api.signupFinal(this.dataArray).subscribe(res => {
          
           console.log('SIGNUP RESPONSE',res)
           if(res.flag == 0) {
             
             this.splash.toast(res.data);
             this.splash.dismiss();
           }
         
           if(res.flag == 6) {
             this.splash.toast(res.message);
             let formdata = new FormData();
             formdata.append('user_id', res.user_id);
 
             this.api.getAccountDetails(this.dataArray).subscribe(res => {
             
               console.log('**ACCOUNRTDETAILS',res)
               if(res.status == 'true') {  
                 this.global.setUser(res.data)
                 this.splash.dismiss();
                // this.navCtrl.push(StepThreePage, {dataStepTwo: formdata,dataStepOne: this.dataStepOne});
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

        Object.keys(this.register.controls).forEach(field => {
          const control = this.register.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }
       }
  }  



