import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';




//@IonicPage()
@Component({
  selector: 'page-divorse-register',
  templateUrl: 'divorse-register.html',
})
export class DivorseRegisterPage {
  public url = "assets/imgs/profile.png";
 
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

    this.register = new FormGroup({
      profilepic : new FormControl('', [Validators.required,]),
      otherpics: new FormControl('', [Validators.required,]),
      mothername: new FormControl('', [Validators.required,]),
      fathermobileno: new FormControl('', [Validators.required,]),
      fatheroccupasion: new FormControl('', [Validators.required,]),
      motheroccupasion: new FormControl('', [Validators.required,]),
      noofBrothers: new FormControl('', [Validators.required,]),
           noofBrothers_name: new FormControl('', [Validators.required,]),
           noofBrothers_dob: new FormControl('', [Validators.required,]),
           noofBrothers_age: new FormControl('', [Validators.required,]),
           noofBrothers_marital_status: new FormControl('', [Validators.required,]),
           noofBrothers_mobile: new FormControl('', [Validators.required,]),
      noofSister: new FormControl('', [Validators.required,]),
           noofSister_name: new FormControl('', [Validators.required,]),
           noofSister_dob: new FormControl('', [Validators.required,]),
           noofSister_age: new FormControl('', [Validators.required,]),
           noofSister_marital_status: new FormControl('', [Validators.required,]),
           noofSister_mobile: new FormControl('', [Validators.required,]),

     noofChildren: new FormControl('', [Validators.required,]),
            noofChildren_name: new FormControl('', [Validators.required,]),
            noofChildren_dob: new FormControl('', [Validators.required,]),
            noofChildren_age: new FormControl('', [Validators.required,]),
            noofChildren_marital_status: new FormControl('', [Validators.required,]),
            noofChildren_gender: new FormControl('', [Validators.required,]),


      manglik: new FormControl('', [Validators.required,]),
      kuldevi: new FormControl('', [Validators.required,]),
      gotra: new FormControl('', [Validators.required,]),
      height: new FormControl('', [Validators.required,]),
      weight: new FormControl('', [Validators.required,]),
      skin: new FormControl('', [Validators.required,]),
      about: new FormControl('', [Validators.required,])
     
     
    });
  }

  DivorseRegister() {
   
      }

    }
  


