import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { MarriedStepTwoPage } from '../married-step-two/married-step-two';


//@IonicPage()
@Component({
  selector: 'page-married-step-one',
  templateUrl: 'married-step-one.html',
})
export class MarriedStepOnePage {

  public url = "assets/imgs/profile.png";
  public isImage: boolean;

  register: FormGroup;
  formdata = new FormData();
  jobselect: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {

    this.jobselect = this.navParams.get('jobselect');
    console.log('jobselected one step---',this.jobselect);
   // this.formdata.append('auth_token', this.DefineProvider.getRnadomToken())

  }

  ngOnInit() {

    this.register = new FormGroup({
      profilepic : new FormControl('', [Validators.required,]),
     // otherpics: new FormControl('', [Validators.required,]),
      mothername: new FormControl('', [Validators.required,]),
      fathermobileno: new FormControl('', [Validators.required,]),
      fatheroccupasion: new FormControl('', [Validators.required,]),
      motheroccupasion: new FormControl('', [Validators.required,])
    
    });
  }

  UploadImage(event) {
    //Show Image
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.isImage = true;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  marrageRegister_StepOne(data: any) {
   // this.navCtrl.push(MarriedStepTwoPage);
    if (this.register.valid) {

      let formdata = new FormData();
       

        formdata.append('profilepic', data.profilepic);
       // formdata.append('otherpics', data.otherpics);
        formdata.append('mothername', data.mothername);
        formdata.append('fathermobileno', data.fathermobileno);
        formdata.append('fatheroccupasion', data.fatheroccupasion);
        formdata.append('motheroccupasion', data.motheroccupasion);
        formdata.append('jobselect', this.jobselect);

      console.log('******ONE STAGE DATA***',data);
        this.navCtrl.push(MarriedStepTwoPage, {dataStepOne: data, jobselect: this.jobselect});
     
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
