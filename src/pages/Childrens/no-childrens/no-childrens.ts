import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { UnmarriedStep2Page } from '../../UnMarried/unmarried-step2/unmarried-step2';
import { DefineProvider } from '../../../providers/define/define';


//@IonicPage()
@Component({
  selector: 'page-no-childrens',
  templateUrl: 'no-childrens.html',
})
export class NoChildrensPage {
  Childrens=[
    {val:'child1',name:'1 child'},
    {val:'child2',name:'2 childrens'},
    {val:'child3',name:'3 childrens'},
    {val:'child4',name:'4 childrens'},
    {val:'child5',name:'5 childrens'},
   // {val:'more6',name:'More Than 6'},
  ]
  register: FormGroup;
  formdata = new FormData();
  noofChildren:any;
  selectedChild: any;
  birthdate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
      this.register = new FormGroup({
     
        noofChildren: new FormControl('', [Validators.required,]),
        noofChildren_name: new FormControl('', [Validators.required,]),
        noofChildren_dob: new FormControl('', [Validators.required,]),
        noofChildren_age: new FormControl('', [Validators.required,]),
        noofChildren_gender: new FormControl('', [Validators.required,]),
        noofChildren_marital_status: new FormControl('', [Validators.required,])

      });
  }
  //----selected  no of children show controls 
  onSelectChildren(val:any){
    console.log('SEL:ECTED VALU',val);
    this.selectedChild =val.val;
    console.log('NO OF BrOTHERS',this.selectedChild);
  }

//--calculate age 
  public ageFromDateOfBirthday(birthdate: any): number {
    //  console.log('birthdate',birthdate);
      return moment().diff(birthdate, 'years');
    }
//save children info
SaveChildrensInfo(data: any) {
  
    if (this.register.valid) {
    
      let formdata = {
        noofChildren: data.noofChildren.name,
        noofChildren_name: data.noofChildren_name,
        noofChildren_dob: data.noofChildren_dob,
        noofChildren_age: data.noofChildren_age,
        noofChildren_gender: data.noofChildren_gender,
        noofChildren_marital_status: data.noofChildren_marital_status,
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

