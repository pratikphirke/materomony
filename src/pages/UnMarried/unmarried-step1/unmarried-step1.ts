import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { AlertController } from 'ionic-angular';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { UnmarriedStep2Page } from '../unmarried-step2/unmarried-step2';


//@IonicPage()
@Component({
  selector: 'page-unmarried-step1',
  templateUrl: 'unmarried-step1.html',
})
export class UnmarriedStep1Page {
  

  register: FormGroup;
  formdata = new FormData();
  jobselect: any;
  fileExtenstion: string;
  base64image: any;
  //selfie: any;
  photos: any=[];
  

  maritalStatusselect: any;
  dataArray= {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider, 
       public alertCtrl : AlertController,  private imagePicker: ImagePicker,
    public actionSheetCtrl: ActionSheetController,  
 private file: File,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {

    this.dataArray = this.navParams.get('dataArray');
    this.jobselect = this.navParams.get('jobselect');
    this.maritalStatusselect = this.navParams.get('maritalStatusselect');

  }

  ngOnInit() {

    this.register = new FormGroup({
      //profilepic : new FormControl('', [Validators.required,]),
      //selfie: new FormControl('', [Validators.required,]),
   //  [Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      fathername: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(20),]),
      fatheroccupasion: new FormControl('', [Validators.required,]),
      fathermobileno: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      mothername: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(12),]),
      motheroccupasion: new FormControl('', [Validators.required,]),
      mothermobileno: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)])
    
    });
  }

  otherPhotos(){

    var options:ImagePickerOptions= {
        maximumImagesCount:4,
        width:100,
        height:100,
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
  
        let filename = results[i].substring(results[i].lastIndexOf('/')+1);
        let path = results[i].substring(0,results[i].lastIndexOf('/')+1);
        this.file.readAsDataURL(path,filename).then((base64string)=>{
        this.photos.push(base64string)
      //  this.photos.reverse();
              })
            }
          
          }, err => {
            console.log(err);
            throw err;
          });
          console.log('Phtots Array: ' ,this.photos);
  }

  deletePhoto(index){
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo?',
      message: ' There is NO undo!',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            
            this.photos.splice(index, 1);
            console.log('Agree clicked',this.photos);
          }
        }
      ]
    });
  confirm.present();

}


goBack() {
  this.navCtrl.pop()
}

  Register_Step1(data: any) {
 
    if (this.register.valid) {
  //  console.log('otherpic1 ----',this.photos.changingThisBreaksApplicationSecurity);


       this.dataArray['fathername'] = data.fathername,
       this.dataArray['fatherOccupation'] = data.fatheroccupasion,
       this.dataArray['fatherMobileNo'] = data.fathermobileno,
     //  this.dataArray['mothername'] = data.mothername,
       this.dataArray['motherOccupation'] = data.motheroccupasion,
      // this.dataArray['motherMobileNo'] = data.mothermobileno,
      // this.dataArray['otherpics'] = this.photos.changingThisBreaksApplicationSecurity,
       this.dataArray['otherpics'] = this.photos.changingThisBreaksApplicationSecurity,

      console.log('---------------unmarried1-----------',this.dataArray)

        this.navCtrl.push(UnmarriedStep2Page, {dataArray: this.dataArray,
                                             jobselect: this.jobselect});
     
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

