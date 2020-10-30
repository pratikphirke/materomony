import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { JobStep2Page } from '../job-step2/job-step2';


//@IonicPage()
@Component({
  selector: 'page-job-step1',
  templateUrl: 'job-step1.html',
})
export class JobStep1Page {

  jobDetailsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jobDetailsForm = new FormGroup({
      experience: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      achievements: new FormControl('', [Validators.required]),
      awards: new FormControl('', [Validators.required])
     
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailsPage');
  }

  submitDetails() {
    this.navCtrl.push(JobStep2Page)
  }
}

