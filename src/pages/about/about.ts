import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import {File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { AlertController } from 'ionic-angular';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { SplashProvider } from '../../providers/splash/splash';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  photos = [];
  img:any;
  finalimgs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,

    public actionSheetCtrl: ActionSheetController,
    public alertCtrl : AlertController,
    public splash: SplashProvider,
    public sanitizer: DomSanitizer,
    private imagePicker: ImagePicker,
    public base64: Base64,
    public camera: Camera,
    public file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
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
      maximumImagesCount:4,
      height:100,
      width:100,//select number of image default is 15
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      DestinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }
        this.imagePicker.getPictures(options).then((results) => {
          for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              this.convertImageToBase64(results[i])
              this.splash.dismiss()
          }
          this.splash.dismiss()
        }, (err) => {
          this.splash.dismiss()
        });
      }
  
  private convertImageToBase64(base64: string) {
    this.splash.presentLoading();
    this.base64.encodeFile(base64).then((base64File: string) => {

        this.photos.push(this.sanitizer.bypassSecurityTrustResourceUrl(base64File));
        for (var i = 0; i < this.photos.length; i++) {
          this.finalimgs =this.photos[i].changingThisBreaksApplicationSecurity;

       }
        console.log('FINAL IMGS----- ' + this.finalimgs);
     //  console.log('otherpic1 ----',this.photos.changingThisBreaksApplicationSecurity);


        this.splash.dismiss();
 
    }, (err) => {
      this.splash.dismiss()
      console.log(err);
    });
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
            console.log('Delete clicked',this.photos);
      
          }
        }
      ]
    });
  confirm.present();

}

  specificimg(img:any){
  
  }
}
