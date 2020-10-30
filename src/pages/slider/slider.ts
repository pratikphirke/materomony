import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { ActionSheetController, Events, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobleServiceProvider } from '../../providers/globle-service/globle-service';
import { ServiceProvider } from '../../providers/service/service';
import { SplashProvider } from '../../providers/splash/splash';
import { UrlProvider } from '../../providers/url/url';


//@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  account: FormGroup;
  today = new Date().toJSON().split('T')[0];
  fileExtenstion: string;
  base64image: any;
  frontId: any;
  selfie: any;
  backId: any;
  id: any;
  user_token: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public api: ServiceProvider, public splash: SplashProvider,
    public globle: GlobleServiceProvider, public events: Events, public modalCtrl: ModalController,
    public urlProvider: UrlProvider, public viewCtrl: ViewController, public actionSheetCtrl: ActionSheetController,
    private base64: Base64, private camera: Camera, private file: File,
    private sanitizer: DomSanitizer
  ) {
    //this.id = window.localStorage.getItem('id')
  //  this.user_token = window.localStorage.getItem('user_token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountVerificationPage');
  }
  public closeModel() {
    this.viewCtrl.dismiss();
  }
  public ngOnInit() {
    this.account = new FormGroup({
     // name: new FormControl('', [Validators.required,]),
    //  number: new FormControl('', [Validators.required,]),
    //  gender: new FormControl('', [Validators.required,]),
    //  dob: new FormControl('', [Validators.required,]),
    //  doc: new FormControl('', [Validators.required,]),
    //  front: new FormControl('', [Validators.required,]),
   //   back: new FormControl('', [Validators.required,]),
      selfie: new FormControl('', [Validators.required,])
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
    // this.user_id = window.localStorage.getItem('id');
    // this.user_token = window.localStorage.getItem('user_token');
    this.base64.encodeFile(base64).then((base64File: string) => {

      if (side == 'selfie') {
        this.selfie = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
      }
    }, (err) => {
      console.log(err);
    });
  }
  submitAccount() {
    if (this.account.valid) {
     // console.log(this.frontId.changingThisBreaksApplicationSecurity);
     // console.log(this.backId.changingThisBreaksApplicationSecurity);
      console.log(this.selfie.changingThisBreaksApplicationSecurity);
      let formdata = new FormData();
    //  formdata.append('auth_token', this.DefineProvider.getRnadomToken());
    //  formdata.append('user_id', this.id);
     // formdata.append('user_token', this.user_token);
     // formdata.append('id_name', data.name);
     // formdata.append('id_number', data.number);
     // formdata.append('gender', data.gender);
      //formdata.append('dob', data.dob);
      //formdata.append('doc_type', data.doc);
    //  formdata.append('doc1', this.frontId.changingThisBreaksApplicationSecurity);
     // formdata.append('doc2', this.backId.changingThisBreaksApplicationSecurity);
      formdata.append('selfi_code', this.selfie.changingThisBreaksApplicationSecurity);

    /*  this.api.submitKycId(formdata).subscribe(res => {
        console.log(res);

        if (res.status == 0) {
          this.splash.toast(res.data);

        }
        if (res.status == 1) {
          this.splash.toast(res.data);
          this.viewCtrl.dismiss();
        }
        if (res.status == 2) {
          this.splash.toast('Error Occured Please Try After Some Time');
          this.viewCtrl.dismiss();
        }
        if (res.status == 3) {
          this.events.publish('logout');
        }
      });*/
    }

    else {
      Object.keys(this.account.controls).forEach(field => {
        const control = this.account.get(field);
        control.markAsTouched({ onlySelf: true });
      })
    }
  }

}

