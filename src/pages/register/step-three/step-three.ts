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
  dataArray = {};
  calage:any;
  birthdatecal: any;
  isLegal: boolean;
  invalidAgeMsg: string;


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
     age: new FormControl('', [Validators.required,]),//AgeValidator,
      gender: new FormControl('', [Validators.required,]),
      religion: new FormControl('', [Validators.required,]),
      caste: new FormControl('', [Validators.required,]),
      langknown: new FormControl('', [Validators.required,])  
    });
    
   
    // return this.register.get('age');
     
  }

  public ageFromDateOfBirthday(birthdate: any): number {
    if(moment().diff(birthdate, 'years') < 18) {
    this.invalidAgeMsg = '*Age should be more than 18 years';
    } else this.invalidAgeMsg = null  

    return moment().diff(birthdate, 'years');
    }

/*
 public ageFromDateOfBirthday(birthdate: any): number {
     this.calage = moment().diff(birthdate, 'years');
   return this.calage;
   
  }

*/

goBack() {
  this.navCtrl.pop()
}
 
Register_StepThree(data: any) {
  
    if (this.register.valid) {     
      //console.log('DATA-------------',data)
  /*    this.isLegal = (this.calage < 18);
      if(this.isLegal){
       
            let alert = this.alertCtrl.create({
              title: 'Invalid Date',
              subTitle: '*Age should be more than 18 years',
              buttons: ['OK']
            });
            alert.present();
      }*/
      
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



