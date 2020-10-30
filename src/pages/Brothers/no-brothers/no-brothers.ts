import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { UnmarriedStep2Page } from '../../UnMarried/unmarried-step2/unmarried-step2';



//@IonicPage()
@Component({
  selector: 'page-no-brothers',
  templateUrl: 'no-brothers.html',
})
export class NoBrothersPage {
  Brothers=[
    {val:'bro1',name:'1 Brother'},
    {val:'bro2',name:'2 Brothers'},
    {val:'bro3',name:'3 Brothers'},
    {val:'bro4',name:'4 Brothers'},
    {val:'bro5',name:'5 Brothers'},
   // {val:'more6',name:'More Than 6'},
  ]
  register: FormGroup;
  formdata = new FormData();
 Noofbrothers:any;
  selectedBro: any;
  birthdate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
      this.register = new FormGroup({
     
        noofBrothers: new FormControl('', [Validators.required,]),
             noofBrothers_name: new FormControl('', [Validators.required,]),
            noofBrothers_dob: new FormControl('', [Validators.required,]),
            noofBrothers_age: new FormControl('', [Validators.required,]),
            noofBrothers_marital_status: new FormControl('', [Validators.required,]),
             noofBrothers_mobile: new FormControl('', [Validators.required,])
  
      });
  }
  //----selected  no of brother show controls 
  onSelectBrother(val:any){
    console.log('SEL:ECTED VALU',val);
    this.selectedBro =val.val;
    console.log('NO OF BrOTHERS',this.selectedBro);
  }

//--calculate age 
  public ageFromDateOfBirthday(birthdate: any): number {
    //  console.log('birthdate',birthdate);
      return moment().diff(birthdate, 'years');
    }
//save brother info
    SaveBrotherInfo(data: any) {
  
    if (this.register.valid) {
    
      let formdata = {
        noofBrothers: data.noofBrothers.name,
        noofBrothers_name: data.noofBrothers_name,
        noofBrothers_dob: data.noofBrothers_dob,
        noofBrothers_age: data.noofBrothers_age,
        noofBrothers_marital_status: data.noofBrothers_marital_status,
        noofBrothers_mobile: data.noofBrothers_mobile,
      }
      console.log('--------------form data----------------- ',formdata)

      
        this.navCtrl.push(UnmarriedStep2Page, {dataBrotherinfo: formdata});
     
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
