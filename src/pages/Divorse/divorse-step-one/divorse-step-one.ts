import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { ActionSheetController, AlertController, NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { DivorseStepTwoPage } from '../divorse-step-two/divorse-step-two';

//@IonicPage()
@Component({
  selector: 'page-divorse-step-one',
  templateUrl: 'divorse-step-one.html',
})
export class DivorseStepOnePage {

  photos: any=[];
 
  register: FormGroup;
  formdata = new FormData();
  dataArray = {};
  jobselect: any;
  fileExtenstion: string;
  base64image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl : AlertController,  private imagePicker: ImagePicker,
    private file: File,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {

    this.jobselect = this.navParams.get('jobselect');
   // console.log('jobselected one step---',this.jobselect);
    this.dataArray = this.navParams.get('dataArray');

  }

  ngOnInit() {

    this.register = new FormGroup({
     // profilepic : new FormControl('', [Validators.required,]),
     // otherpics: new FormControl('', [Validators.required,]),
    
     fathername: new FormControl('', [Validators.required,]),
      fathermobileno: new FormControl('', [Validators.required,]),
      fatheroccupasion: new FormControl('', [Validators.required,]),
      motheroccupasion: new FormControl('', [Validators.required,])
    
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
      
  DivorseRegister_Step1(data: any) {

    if (this.register.valid) {

        this.dataArray['fatherName'] = data.fathername,
        this.dataArray['fatherMobileNo'] = data.fathermobileno,
        this.dataArray['fatherOccupation'] = data.fatheroccupasion,
        this.dataArray['motherOccupation'] = data.motheroccupasion,
        this.dataArray['otherpics'] = this.photos.changingThisBreaksApplicationSecurity,

 
       console.log('-----------Divorse 1---------------',this.dataArray)
 
        this.navCtrl.push(DivorseStepTwoPage,  {dataArray: this.dataArray,
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
