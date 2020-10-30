import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { SplashProvider } from '../../../providers/splash/splash';
import { BusinessStep2Page } from '../business-step2/business-step2';


//@IonicPage()
@Component({
  selector: 'page-business-step1',
  templateUrl: 'business-step1.html',
})
export class BusinessStep1Page {

  businessForm: FormGroup;
  otherpic1: any;
  otherpic2: any;
  otherpic3: any;
  otherpic4: any;
  fileExtenstion: string;
  base64image: any;
  selfie: any;
  dataArray = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,  public splash: SplashProvider,
    private base64: Base64, private camera: Camera, private file: File, private sanitizer: DomSanitizer,) {

      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.businessForm = new FormGroup({
      bussinesslogo : new FormControl(),
     // otherpics: new FormControl('', [Validators.required]),
    // selfie: new FormControl(),
     otherpic1: new FormControl(),
     otherpic2: new FormControl(),
     otherpic3: new FormControl(),
     otherpic4: new FormControl(),
      company: new FormControl('', [Validators.required]),
      office_address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    
     
    })
  }

  ionViewDidLoad() {
    this.dataArray = this.navParams.get('dataArray');
    console.log('ionViewDidLoad JobDetailsPage');
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

          if (side == 'otherpic1') {
            this.otherpic1 = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
          }
          if (side == 'otherpic2') {
            this.otherpic2 = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
          }
          if (side == 'otherpic3') {
            this.otherpic3 = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
          }
          if (side == 'otherpic4') {
            this.otherpic4 = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
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
    
       this.dataArray['bussinesslogo'] = data.bussinesslogo,
      this.dataArray['company'] = data.company,
      this.dataArray['office_address'] = data.office_address,
      this.dataArray['email'] = data.email,
      this.dataArray['otherpic1'] = data.otherpic1,
      this.dataArray['otherpic2'] = data.otherpic2,
      this.dataArray['otherpic3'] = data.otherpic3,
      this.dataArray['otherpic4'] = data.otherpic4
   

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



