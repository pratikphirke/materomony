import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { StepFourPage } from '../../register/step-four/step-four';

//@IonicPage()
@Component({
  selector: 'page-job-step2',
  templateUrl: 'job-step2.html',
})
export class JobStep2Page {

  jobDetailsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jobDetailsForm = new FormGroup({
    
      noticePeriod: new FormControl('', [Validators.required]),
      totalExperience: new FormControl('', [Validators.required]),
      currentSalary: new FormControl('', [Validators.required]),
      expectedSalary: new FormControl('', [Validators.required])
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailsPage');
  }

  submitDetails() {
    this.navCtrl.push(StepFourPage)
  }
}

