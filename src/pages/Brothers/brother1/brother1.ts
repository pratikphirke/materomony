import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { NavController, NavParams, Slides } from 'ionic-angular';
import moment from 'moment';

//@IonicPage()
@Component({
  selector: 'page-brother1',
  templateUrl: 'brother1.html',
})
export class Brother1Page {
 
  totalBrothers = [];
  brothersForm: FormGroup;
  brothersArray = [];
  noOfBrothers: any;
  birthdate:any;
  @ViewChild('slides') slides: Slides;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.brothersForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      birthdate: new FormControl(),
      age: new FormControl('', [Validators.required]),
      marital_status: new FormControl('', [Validators.required]),
      brotheroccupasion: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    });
  }

  ionViewDidLoad() {

    this.noOfBrothers = this.navParams.get('value');
    console.log('----SELECTED BRO----',this.noOfBrothers);
  }
  next(data) {
    if (this.brothersForm.valid) {
      if(data) {
        this.brothersArray.push(data)
      }
      
      this.slides.slideNext();
      }
      else {
        console.log('form errr');

        Object.keys(this.brothersForm.controls).forEach(field => {
          const control = this.brothersForm.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }
       
  }

  prev() {
    this.slides.slidePrev();
  }

  close(data) {


    if (this.brothersForm.valid) {
      if(data) {
        this.brothersArray.push(data)
       // this.brothersArray.push(UnmarriedStep2Page,{data: data})
      }
      console.log('-------------Data-------------', this.brothersArray);
      this.viewCtrl.dismiss(this.brothersArray)
  
       }   //this.navCtrl.pop()
      else {
        console.log('form errr');

        Object.keys(this.brothersForm.controls).forEach(field => {
          const control = this.brothersForm.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }


   
  }



  public ageFromDateOfBirthday(birthdate: any): number {
    //  console.log('birthdate',birthdate);
      return moment().diff(birthdate, 'years');
    }

  
  // submitDetails(data) {
  //   console.log('----------------- Brothers --------------', data);
  //   this.navCtrl.push(MarriageStep2Page)
  // }
}

 /*
  register: FormGroup;
  formdata = new FormData();

  birthdate:any;
  SelectedBroCount: any;
  selectedbroname: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
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
    
    this.selectedbroname = this.navParams.get('selectedbroname');
    console.log('--selectedbroname---',this.selectedbroname);
    
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

   

      console.log('--------------form data----------------- ',data)
      if(this.SelectedBroCount >='2'){
     //   console.log(' EQUAL go to next SELECTED BRO',this.SelectedBroCount)
        this.navCtrl.push(Brother2Page, {Brother1info: data,
                                        SelectedBroCount: this.SelectedBroCount});

      }else if(this.SelectedBroCount=='1'){
      //  console.log('go to home ',this.SelectedBroCount)
        this.navCtrl.push(UnmarriedStep2Page, {Brother1info: data,
                                              SelectedBroCount: this.SelectedBroCount,
                                              selectedbroname: this.selectedbroname});
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