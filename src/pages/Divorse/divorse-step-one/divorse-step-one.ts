import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
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

  public url = "assets/imgs/profile.png";
 
  register: FormGroup;
  formdata = new FormData();
  dataArray = {};
  jobselect: any;
  fileExtenstion: string;
  base64image: any;
  //selfie: any;
  otherpic1: any;
  otherpic2: any;
  otherpic3: any;
  otherpic4: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public actionSheetCtrl: ActionSheetController,
    private base64: Base64, private camera: Camera, private file: File, private sanitizer: DomSanitizer,
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
     otherpic1: new FormControl(),
     otherpic2: new FormControl(),
     otherpic3: new FormControl(),
     otherpic4: new FormControl(),
     fathername: new FormControl('', [Validators.required,]),
      fathermobileno: new FormControl('', [Validators.required,]),
      fatheroccupasion: new FormControl('', [Validators.required,]),
      motheroccupasion: new FormControl('', [Validators.required,])
    
    });
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
      
  DivorseRegister_Step1(data: any) {

    if (this.register.valid) {

        this.dataArray['fathername'] = data.fathername,
        this.dataArray['fathermobileno'] = data.fathermobileno,
        this.dataArray['fatheroccupasion'] = data.fatheroccupasion,
        this.dataArray['motheroccupasion'] = data.motheroccupasion,
        this.dataArray['otherpic1'] = data.otherpic1,
        this.dataArray['otherpic2'] = data.otherpic2,
        this.dataArray['otherpic3'] = data.otherpic3,
        this.dataArray['otherpic4'] = data.otherpic4
     
 
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
