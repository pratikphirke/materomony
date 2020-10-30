import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

//@IonicPage()
@Component({
  selector: 'page-job-step3',
  templateUrl: 'job-step3.html',
})
export class JobStep3Page {

  jobDetailsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jobDetailsForm = new FormGroup({
      experience: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      achievements: new FormControl('', [Validators.required]),
      awards: new FormControl('', [Validators.required]),
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
    
  }
}

