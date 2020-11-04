import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { BusinessStep3Page } from '../business-step3/business-step3';



//@IonicPage()
@Component({
  selector: 'page-business-step2',
  templateUrl: 'business-step2.html',
})
export class BusinessStep2Page {

  businessForm: FormGroup;
  dataArray = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.businessForm = new FormGroup({
      
      mobile1: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      mobile2: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      gstin: new FormControl('', [Validators.required]),
      businessType: new FormControl('', [Validators.required]),
      products: new FormControl('', [Validators.required]),
     
    })
  }

  ionViewDidLoad() {
    this.dataArray = this.navParams.get('dataArray');

  }

  goBack() {
    this.navCtrl.pop()
  }

	
  submitDetails(data:any) {
    if (this.businessForm.valid) {

      this.dataArray['mobile1'] = data.mobile1,
      this.dataArray['mobile2'] = data.mobile2,
      this.dataArray['gstin'] = data.gstin,
      this.dataArray['business_type'] = data.businessType,
      this.dataArray['products'] = data.products




     console.log('---------------BusinessStep2-----------',this.dataArray)
          this.navCtrl.push(BusinessStep3Page, {dataArray: this.dataArray});
       
        }
        else {
          console.log('form errr');
  
          Object.keys(this.businessForm.controls).forEach(field => {
            const control = this.businessForm.get(field);
            control.markAsTouched({ onlySelf: true });
          })
        }
         }
  
}
