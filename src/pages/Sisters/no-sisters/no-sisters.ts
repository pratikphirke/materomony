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
  selector: 'page-no-sisters',
  templateUrl: 'no-sisters.html',
})
export class NoSistersPage {
  Sisters=[
    {val:'sis1',name:'1 Sister'},
    {val:'sis2',name:'2 Sisters'},
    {val:'sis3',name:'3 Sisters'},
    {val:'sis4',name:'4 Sisters'},
    {val:'sis5',name:'5 Sisters'},
   // {val:'more6',name:'More Than 6'},
  ]
  register: FormGroup;
  formdata = new FormData();
  noofSister:any;
 selectedSis: any;
  birthdate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
      this.register = new FormGroup({
     
        noofSister: new FormControl('', [Validators.required,]),
         noofSister_name: new FormControl('', [Validators.required,]),
        noofSister_dob: new FormControl('', [Validators.required,]),
        noofSister_age: new FormControl('', [Validators.required,]),
          noofSister_marital_status: new FormControl('', [Validators.required,]),
          noofSister_mobile: new FormControl('', [Validators.required,]),
  
      });
  }
  //----selected  no of Sister show controls 
  onSelectSister(val:any){
    console.log('SELECTED VALU',val);
    this.selectedSis =val.val;
    console.log('NO OF SISTER',this.selectedSis);
  }

//--calculate age 
  public ageFromDateOfBirthday(birthdate: any): number {
    //  console.log('birthdate',birthdate);
      return moment().diff(birthdate, 'years');
    }
//save Sister info
SaveSistersInfo(data: any) {
  
    if (this.register.valid) {
    
      let formdata = {
        noofSister: data.noofSister.name,
        noofSister_name: data.noofSister_name,
        noofSister_dob: data.noofSister_dob,
        noofSister_age: data.noofSister_age,
        noofSister_marital_status: data.noofSister_marital_status,
        noofSister_mobile: data.noofSister_mobile,
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
