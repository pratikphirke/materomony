import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { BusinessStep1Page } from '../../Business/business-step1/business-step1';
import { DivorseStepOnePage } from '../../Divorse/divorse-step-one/divorse-step-one';
import { JobDetailsPage } from '../../Job/job-details/job-details';
import { UnmarriedStep1Page } from '../../UnMarried/unmarried-step1/unmarried-step1';
//@IonicPage()
@Component({
  selector: 'page-step-four',
  templateUrl: 'step-four.html',
})
export class StepFourPage {

  listHobby :any = ['Music','Painting'];
  SelecteHobby='';
  register: FormGroup;
  formdata = new FormData();
  mastatus: any;
  profselect: any;
  maritalStatusselect: any;

  dataArray={};


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public alertCtrl: AlertController,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {
    this.dataArray = this.navParams.get('dataArray');
   // console.log('-----------Step3 data-------------',this.dataArray)
  }

  ngOnInit() {

    this.register = new FormGroup({
    
      higheducation: new FormControl('', [Validators.required,]),
      annual_income: new FormControl('', [Validators.required,]),
      hobby: new FormControl('', [Validators.required,]),
      marital_status: new FormControl('', [Validators.required,]),
      profession: new FormControl('', [Validators.required,])
     
    });
   
  }


  goBack() {
    this.navCtrl.pop()
  }

	

 public addHobby() {
    let alert = this.alertCtrl.create({
      title: 'Add Hobby',
      inputs: [
        {
          name: 'Hobby',
          placeholder: 'Enter Hobby'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
         //   console.log('Cancel clicked');
          }
        },
        {
          text: 'Add TO List',
          handler: data => {
            if (!data) {
              console.log('we have data',data.Hobby)
            } else {
              // invalid login
              console.log('add hobby',data.Hobby)
              this.SelecteHobby = data.Hobby;
            
             this.listHobby.push(this.SelecteHobby);
            //  this.SelecteHobby="";
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }



  Register_StepFour(data: any) {
    if (this.register.valid) {

        this.dataArray['education'] = data.higheducation,
        this.dataArray['annual_income'] = data.annual_income,
        this.dataArray['hobbies'] = data.hobby,
        this.dataArray['marital_status'] = data.marital_status,
        this.dataArray['profession'] = data.profession,

   

        console.log('--------------form data4----------------- ',this.dataArray);

      //  this.navCtrl.push(StepFourPage, {dataArray: this.dataArray});

     if(data.marital_status=="UnMarried"){
          this.profselect = data.profession;
        // console.log('SELECT STATUS',data.marital_status +'   SELECTED PROFESSION',this.profselect);
          this.navCtrl.push(UnmarriedStep1Page, {dataArray: this.dataArray,
                                                  jobselect: this.profselect});

     }else if(data.marital_status=="Divorse"){
           this.profselect = data.profession;
        
          this.navCtrl.push(DivorseStepOnePage, {dataArray: this.dataArray,
                                                 jobselect: this.profselect})

     }else if(data.marital_status=="Married" && data.profession=="Job"){
           this.maritalStatusselect = data.marital_status;
          
           this.navCtrl.push(JobDetailsPage, {dataArray: this.dataArray,
                                              maritalStatusselect: this.maritalStatusselect,
                                              jobselect: this.profselect})

     }else if(data.marital_status=="Married" && data.profession=="Business"){
           this.maritalStatusselect = data.marital_status;
            
           this.navCtrl.push(BusinessStep1Page,  {dataArray: this.dataArray,
                                                maritalStatusselect: this.maritalStatusselect,
                                                jobselect: this.profselect})

    }else if(data.marital_status=="NeverMarried" && data.profession=="Job"){
          this.maritalStatusselect = data.marital_status;
         
          this.navCtrl.push(JobDetailsPage, {dataArray: this.dataArray,
                                              maritalStatusselect: this.maritalStatusselect,
                                              jobselect: this.profselect})


    }else if(data.marital_status=="NeverMarried" && data.profession=="Business"){
         this.maritalStatusselect = data.marital_status;
      
          this.navCtrl.push(BusinessStep1Page, {dataArray: this.dataArray,
                                                maritalStatusselect: this.maritalStatusselect,
                                                jobselect: this.profselect})

        }
       /* this.api.emailOTP(formdata).subscribe(res => {
          console.log(res)
          if (res.flag == 3) {
           // console.log('flag 3 true OTP SEND');
          this.navCtrl.push(OtpPage, {dataStepFour: data, dataStepThree: this.dataStepThree,
                                       dataStepTwo: this.dataStepTwo,dataStepOne: this.dataStepOne,
                                        otp: res.otp});
                                      }
        });
      */
     
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




