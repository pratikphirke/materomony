import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, Slides, ViewController } from 'ionic-angular';
import moment from 'moment';


//@IonicPage()
@Component({
  selector: 'page-children1',
  templateUrl: 'children1.html',
})
export class Children1Page {

  childrensForm: FormGroup;
  formdata = new FormData();
  noOfchildrens:any;
  selectedChild: any;
  birthdate:any;
  childrenArray = [];
  SelectedChildCount: any;
  @ViewChild('slides') slides: Slides;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.childrensForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      birthdate: new FormControl(),
      age: new FormControl('', [Validators.required]),
      marital_status: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  ionViewDidLoad() {

    this.noOfchildrens = this.navParams.get('value');
    console.log('----SELECTED child----',this.noOfchildrens);
  }
  next(data) {
    if (this.childrensForm.valid) {
      if(data) {
        this.childrenArray.push(data)
      }
      
      this.slides.slideNext();
      }
      else {
        console.log('form errr');

        Object.keys(this.childrensForm.controls).forEach(field => {
          const control = this.childrensForm.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }
       
  }

  prev() {
    this.slides.slidePrev();
  }

  close(data) {


    if (this.childrensForm.valid) {
      if(data) {
        this.childrenArray.push(data)
       // this.brothersArray.push(UnmarriedStep2Page,{data: data})
      }
      console.log('-------------Data-------------', this.childrenArray);
      this.viewCtrl.dismiss(this.childrenArray)
  
       }   //this.navCtrl.pop()
      else {
        console.log('form errr');

        Object.keys(this.childrensForm.controls).forEach(field => {
          const control = this.childrensForm.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }


   
  }



  public ageFromDateOfBirthday(birthdate: any): number {
    //  console.log('birthdate',birthdate);
      return moment().diff(birthdate, 'years');
    }
  }

      /*  //save children info
    SaveChildrensInfo() {
  
        if (this.childrensForm.valid) {
          let formdata = new FormData();
       
          ///  formdata.append('', this.dataStepOne);
              formdata.append('noofChildren_name', data.noofChildren_name);
              formdata.append('noofChildren_dob', data.noofChildren_dob);
              formdata.append('noofChildren_dob', data.noofChildren_dob);
              formdata.append('noofChildren_gender', data.noofChildren_gender);
              formdata.append('noofChildren_marital_status', data.noofChildren_marital_status);
              formdata.append('SelectedChildCount',this.SelectedChildCount);
      
        
            console.log('--------------form data----------------- ',data)
            if(this.SelectedChildCount >='2'){
           //   console.log(' EQUAL go to next SELECTED BRO',this.SelectedBroCount)
              this.navCtrl.push(Children2Page, {Child1Info: data,SelectedChildCount: this.SelectedChildCount});
      
            }else if(this.SelectedChildCount=='1'){
            //  console.log('go to home ',this.SelectedBroCount)
              this.navCtrl.push(UnmarriedStep2Page, {Brother1info: data,
                                                    SelectedChildCount: this.SelectedChildCount});
            }
          }
          else {
            console.log('form errr');

            Object.keys(this.childrensForm.controls).forEach(field => {
              const control = this.childrensForm.get(field);
              control.markAsTouched({ onlySelf: true });
            })
              }
          
   
}*/
