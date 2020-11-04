import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { ActionSheetController, AlertController, NavController, NavParams } from 'ionic-angular';
import { SplashProvider } from '../../../providers/splash/splash';
import { BusinessStep2Page } from '../business-step2/business-step2';


//@IonicPage()
@Component({
  selector: 'page-business-step1',
  templateUrl: 'business-step1.html',
})
export class BusinessStep1Page {

  businessForm: FormGroup;
  photos: any=[];
  fileExtenstion: string;
  base64image: any;
  selfie: any;
  dataArray = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl : AlertController,  private imagePicker: ImagePicker,
    public actionSheetCtrl: ActionSheetController,  public splash: SplashProvider,
    private base64: Base64, private camera: Camera, private file: File, private sanitizer: DomSanitizer,) {

      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.businessForm = new FormGroup({
   
      selfie: new FormControl(),
      company: new FormControl('', [Validators.required]),
      office_address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    
     
    })
  }

  ionViewDidLoad() {
    this.dataArray = this.navParams.get('dataArray');
    console.log('ionViewDidLoad JobDetailsPage');
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

    public getPhoto(side) {
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [{
          text: 'File Manager',
          icon: 'folder-open',
          cssClass: 'actionSheetButon',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, side);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          cssClass: 'actionSheetButon',
          handler: () => {

            this.takePicture(this.camera.PictureSourceType.CAMERA, side);
          }
        },]
      });
      actionSheet.present();
    }

    public takePicture(sourceType, side) {
      // Create options for the Camera Dialog
      var options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: true,
        correctOrientation: true,
        DestinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };
      this.camera.getPicture(options).then((imagePath) => {
        this.file.resolveLocalFilesystemUrl(imagePath).then(fileInfo => {
          let files = fileInfo as FileEntry;
          files.file(() => {
            // this.fileName = success.name
            this.convertImageToBase64(imagePath, side);

          });
        }, err => {
          console.log(err);
          throw err;
        });
      });
    }

      private convertImageToBase64(base64: string, side) {
      this.splash.presentLoading();
      this.base64.encodeFile(base64).then((base64File: string) => {
      this.splash.dismiss();
        if (side == 'selfie') {
          this.selfie = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
        }
      }, (err) => {
        console.log(err);
      });
      }

      
  goBack() {
    this.navCtrl.pop()
  }

	
  submitDetails(data: any) {
    if (this.businessForm.valid) {
    
      this.dataArray['business_logo'] = this.selfie.changingThisBreaksApplicationSecurity,
      this.dataArray['company'] = data.company,
      this.dataArray['office_address'] = data.office_address,
      this.dataArray['email'] = data.email,
      this.dataArray['otherpics_business'] = this.photos.changingThisBreaksApplicationSecurity,

  

     console.log('---------------BusinessStep1-----------',this.dataArray)

       this.navCtrl.push(BusinessStep2Page, {dataArray: this.dataArray});
      }
      else {
        console.log('form errr');

        Object.keys(this.businessForm.controls).forEach(field => {
          const control = this.businessForm.get(field);
          control.markAsTouched({ onlySelf: true });
        })
      }
       }
  }



