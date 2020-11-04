import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { StepTwoPage } from '../step-two/step-two';

//@IonicPage()
@Component({
  selector: 'page-step-one',
  templateUrl: 'step-one.html',
})
export class StepOnePage {
  public url = "assets/imgs/profile.png";
  public isImage: boolean;
  
  register: FormGroup;
  formdata = new FormData();
  email: any;
  fileExtenstion: string;
  base64image: any;
  selfie: any;
  countries:any =[];

  dataArray ={};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,
    public DefineProvider: DefineProvider,
    public actionSheetCtrl: ActionSheetController, public alertCtrl : AlertController,
    private base64: Base64, private camera: Camera, private file: File,
    private sanitizer: DomSanitizer,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {
    this.email = this.navParams.get('email');
 
    this.api.getCountries().subscribe(res => {
      if (res.flag == 8) {
        this.countries = res.data;
      }else {
        this.splash.toast('Error Occured Please Try After Some Time');
      }
    });
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.register = new FormGroup({
    //  profilepic : new FormControl('', [Validators.required,]),
      selfie: new FormControl(),
      firstname: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(20),]),
      middlename: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(20),]),
      lastname: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(20),]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      mobile1: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      mobile2: new FormControl('', [Validators.minLength(10),Validators.maxLength(10)])
    
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
        this.splash.dismiss();
          if (side == 'selfie') {
            this.selfie = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);
          }
        }, (err) => {
          console.log(err);
        });
      }

   /*   deletePhoto(index){
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
                
                this.selfie.splice(index, 1);
                console.log('Agree clicked',this.selfie);
              }
            }
          ]
        });
      confirm.present();
  
    }*/
  Register_StepOne(data) {

   
       if (this.register.valid) {
       // console.log('Selfi ----',this.selfie.changingThisBreaksApplicationSecurity);
     /*
                     this.dataArray = [{
              profile: data.selfie,
             firstname: data.firstname,
             middlename: data.middlename,
             lastname: data.lastname,
             mobile1: data.mobile1,
             mobil2: data.mobil2,
            }]
              */
  
            this.dataArray['photo'] = this.selfie.changingThisBreaksApplicationSecurity,
            //this.dataArray['photo'] = 'photo url',
             this.dataArray['firstname'] = data.firstname,
             this.dataArray['middlename'] = data.middlename,
             this.dataArray['lastname'] = data.lastname,
             this.dataArray['email'] = data.email,
             this.dataArray['phone1'] = data.mobile1,
             this.dataArray['phone2'] = data.mobile2,
          
          //call country api here

        //  formdata.append('selfi_code', this.selfie.changingThisBreaksApplicationSecurity);
        console.log('---------------sterp1-----------',this.dataArray)
          this.navCtrl.push(StepTwoPage, {dataArray: this.dataArray, countries:  this.countries});
       
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


