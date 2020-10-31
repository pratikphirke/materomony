import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { SplashProvider } from '../../providers/splash/splash';
import { UnmarriedStep2Page } from '../UnMarried/unmarried-step2/unmarried-step2';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  dataArray = {};
  marriageForm: FormGroup;
  otherpics: any;
  allImages = [];
  finalimgs: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public splash: SplashProvider,
    public sanitizer: DomSanitizer,
    private imagePicker: ImagePicker,
    public base64: Base64,
    public camera: Camera,
    public file: File
    ) {
    this.marriageForm = new FormGroup({
      otherpics: new FormControl('', [Validators.required]),
      fathername: new FormControl('', [Validators.required]),
      fathermobileno: new FormControl('', [Validators.required]),
      fatherOccupation: new FormControl('', [Validators.required]),
      motherOccupation: new FormControl('', [Validators.required])
    })
  }

  ionViewDidLoad() {
  
  }

  public getPhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: 'File Manager',
        icon: 'folder-open',
        cssClass: 'actionSheetButon',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Camera',
        icon: 'camera',
        cssClass: 'actionSheetButon',
        handler: () => {

          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },]
    });
    actionSheet.present();
  }
  
  takePicture(sourceType: number) {
    let options = {
      maximumImagesCount:4, //select number of image default is 15
      sourceType: sourceType,
      width:100,
      height:100,
      quality:50,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      DestinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      }
        this.imagePicker.getPictures(options).then((results) => {
          for (var i = 0; i < results.length; i++) {

            //  console.log('Image URI: ' + results[i]);

              this.convertImageToBase64(results[i])
              this.splash.dismiss()
          }
          this.splash.dismiss()
        }, () => {
          this.splash.dismiss()
        });
      }
  
  private convertImageToBase64(base64: string) {
    this.splash.presentLoading();
    this.base64.encodeFile(base64).then((base64File: string) => {

        this.allImages.push(this.sanitizer.bypassSecurityTrustResourceUrl(base64File));
        
        this.splash.dismiss();
 
    }, (err) => {
      this.splash.dismiss()
      console.log(err);
    });
  }
  goBack(){}
  submitDetails(data) {
    if(this.marriageForm.valid) {
      console.log('otherpiccs ----',this.otherpics.changingThisBreaksApplicationSecurity);
      for (var i = 0; i < this.allImages.length; i++) {
        this.finalimgs =this.allImages[i].changingThisBreaksApplicationSecurity;

     }
      console.log('FINAL IMGS----- ' + this.finalimgs);
      
    //  this.dataArray['otherpics'] = this.allImages,

      this.dataArray['fathername'] = data.fathername,
      this.dataArray['fatherMobileNo'] = data.fathermobileno,
      this.dataArray['fatherOccupation'] = data.fatherOccupation,
      this.dataArray['motherOccupaion'] = data.motherOccupation,

      this.navCtrl.push(UnmarriedStep2Page, {
        dataArray: this.dataArray
      })
    }
  }
}




/*
imgpicker(){

  var options:ImagePickerOptions=
  {
      maximumImagesCount:3,
      width:100,
      height:100,
  }
  this.imagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {

      let filename = results[i].substring(results[i].lastIndexOf('/')+1);
      let path = results[i].substring(0,results[i].lastIndexOf('/')+1);
      this.file.readAsDataURL(path,filename).then((base64string)=>{
      this.photos.push(base64string)
            })
          console.log('Image URI: ' + results[i]);
          console.log('Image URI: ' ,this.photos.img);
          }
        }, (err) => { })

}
*/

