import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';



//@IonicPage()
@Component({
  selector: 'page-business-details',
  templateUrl: 'business-details.html',
})
export class BusinessDetailsPage {
  businessForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.businessForm = new FormGroup({
      company: new FormControl('', [Validators.required]),
      office_address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile1: new FormControl('', [Validators.required]),
      mobile2: new FormControl('', [Validators.required]),
      gstin: new FormControl('', [Validators.required]),
      businessType: new FormControl('', [Validators.required]),
      products: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required]),
      turnover: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required]),
      linkedin: new FormControl('', [Validators.required]),
      facebook: new FormControl('', [Validators.required]),
      instagram: new FormControl('', [Validators.required])
     
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailsPage');
  }

  submitDetails() {
    
  }

}
