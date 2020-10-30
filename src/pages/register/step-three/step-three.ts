import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { StepFourPage } from '../step-four/step-four';
import * as moment from 'moment';
//@IonicPage()
@Component({
  selector: 'page-step-three',
  templateUrl: 'step-three.html',
})
export class StepThreePage {

 languages :any =[];// = ['Hindi','Marathi'];
  SelecteLang='';
  register: FormGroup;
  formdata = new FormData();
  birthdate:any;
  calAge: number;
  dataArray = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public alertCtrl: AlertController,
    public splash: SplashProvider) {
    
  }
  ionViewDidLoad() {
    this.dataArray = this.navParams.get('dataArray');
   // console.log('-----------Step2 data-------------',this.dataArray)
    this.api.getLanguages().subscribe(res => {
      if (res.flag == 8) {
        this.languages = res.data;
      }else {
        this.splash.toast('Error Occured Please Try After Some Time');
      }
    });

  }

  ngOnInit() {
 
    this.register = new FormGroup({
    
      birthdate: new FormControl('', [Validators.required,]),
      age: new FormControl('', [Validators.required,]),
      gender: new FormControl('', [Validators.required,]),
      religion: new FormControl('', [Validators.required,]),
      caste: new FormControl('', [Validators.required,]),
      langknown: new FormControl('', [Validators.required,])  
     
    });
  }
 


  public ageFromDateOfBirthday(birthdate: any): number {
    return moment().diff(birthdate, 'years');
  }
  
goBack() {
  this.navCtrl.pop()
}
 
Register_StepThree(data: any) {
  
    if (this.register.valid) {

        this.dataArray['dob'] = data.birthdate,
        this.dataArray['age'] = data.age,
        this.dataArray['gender'] = data.gender,
        this.dataArray['religion'] = data.religion,
        this.dataArray['caste'] = data.caste,
        this.dataArray['languages'] = data.langknown,

    
        console.log('--------------form data3----------------- ',this.dataArray);

        this.navCtrl.push(StepFourPage, {dataArray: this.dataArray});
     
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



