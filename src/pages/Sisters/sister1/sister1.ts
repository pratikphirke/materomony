import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Slides, ViewController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import moment from 'moment';


//@IonicPage()
@Component({
  selector: 'page-sister1',
  templateUrl: 'sister1.html',
})
export class Sister1Page {



  totalSisters = [];
  sistersForm: FormGroup;

  sistersArray = [];
  noOfsisters: any;
  birthdate:any;
  @ViewChild('slides') slides: Slides;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.sistersForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      marital_status: new FormControl('', [Validators.required]),
      sisteroccupasion: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    });
  }

  ionViewDidLoad() {

    this.noOfsisters = this.navParams.get('value');
    console.log('----SELECTED sis----',this.noOfsisters);
  }

  next(data) {
    if (this.sistersForm.valid) {
      if(data) {
        this.sistersArray.push(data)
      }
      
      this.slides.slideNext();
      }
      else {
        console.log('form errr');

        Object.keys(this.sistersForm.controls).forEach(field => {
          const control = this.sistersForm.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }
       
  }

  prev() {
    this.slides.slidePrev();
  }

  close(data) {


    if (this.sistersForm.valid) {
      if(data) {
        this.sistersArray.push(data)
       // this.brothersArray.push(UnmarriedStep2Page,{data: data})
      }
      console.log('-------------Data-------------', this.sistersArray);
      this.viewCtrl.dismiss(this.sistersArray)
  
       }   //this.navCtrl.pop()
      else {
        console.log('form errr');

        Object.keys(this.sistersForm.controls).forEach(field => {
          const control = this.sistersForm.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }


   
  }





 
  
  public ageFromDateOfBirthday(birthdate: any): number {
    //  console.log('birthdate',birthdate);
      return moment().diff(birthdate, 'years');
    }


}

/*
  register: FormGroup;
  formdata = new FormData();

  birthdate:any;
  SelectedSisCount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public splash: SplashProvider) {
      this.register = new FormGroup({
     

         noofSister_name: new FormControl('', [Validators.required,]),
        noofSister_dob: new FormControl('', [Validators.required,]),
        noofSister_age: new FormControl('', [Validators.required,]),
          noofSister_marital_status: new FormControl('', [Validators.required,]),
          noofSister_mobile: new FormControl('', [Validators.required,]),
  
      });
  }
      ionViewDidLoad() {

        this.SelectedSisCount = this.navParams.get('SelectedSisCount');
        console.log('--SelectedSisCount---',this.SelectedSisCount);

      }
    //--calculate age 
      public ageFromDateOfBirthday(birthdate: any): number {
        //  console.log('birthdate',birthdate);
          return moment().diff(birthdate, 'years');
        }
    //save Sister info
    SaveSistersInfo(data: any) {
      
    if (this.register.valid) {
  
      let formdata = new FormData();
        ///  formdata.append('', this.dataStepOne);
        formdata.append('noofSister_name', data.noofSister_name);
        formdata.append('noofSister_dob', data.noofSister_dob);
        formdata.append('noofSister_age', data.noofSister_age);
        formdata.append('noofSister_marital_status', data.noofSister_marital_status);
        formdata.append('noofSister_mobile', data.noofSister_mobile);
        formdata.append('SelectedSisCount',this.SelectedSisCount);

  
      console.log('--------------form data----------------- ',data)

      if(this.SelectedSisCount >='2'){
        //   console.log(' EQUAL go to next SELECTED BRO',this.SelectedBroCount)
           this.navCtrl.push(Sister2Page, {Sister1info: data,SelectedSisCount: this.SelectedSisCount});
   
         }else if(this.SelectedSisCount=='1'){
         //  console.log('go to home ',this.SelectedBroCount)
           this.navCtrl.push(UnmarriedStep2Page, {Sister1info: data,
                                                 SelectedSisCount: this.SelectedSisCount});
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
*/