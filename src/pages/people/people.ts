import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { AlertController } from 'ionic-angular';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { SplashProvider } from '../../providers/splash/splash';

//@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {
  photos = [];
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

  specificimg(img:any){
   
  }
}
