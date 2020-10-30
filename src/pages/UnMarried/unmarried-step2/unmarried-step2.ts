import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { Brother1Page } from '../../Brothers/brother1/brother1';
import { Sister1Page } from '../../Sisters/sister1/sister1';
import { UnmarriedStep3Page } from '../unmarried-step3/unmarried-step3';



//@IonicPage()
@Component({
  selector: 'page-unmarried-step2',
  templateUrl: 'unmarried-step2.html',
})
export class UnmarriedStep2Page {
  selBro='';
  selSis='';
  public url = "assets/imgs/profile.png";
  Brothers=[
    {val:'0',name:'No Brother'},
    {val:'1',name:'1 Brother'},
    {val:'2',name:'2 Brothers'},
    {val:'3',name:'3 Brothers'},
    {val:'4',name:'4 Brothers'},
    {val:'5',name:'5 Brothers'},
   // {val:'more6',name:'More Than 6'},
  ]

  selectedBro: any;
  selectedbroname:any;
  selectedsisname:any;
  Sisters=[
    {val:'0',name:'No Sister'},
    {val:'1',name:'1 Sister'},
    {val:'2',name:'2 Sisters'},
    {val:'3',name:'3 Sisters'},
    {val:'4',name:'4 Sisters'},
    {val:'5',name:'5 Sisters'},
   // {val:'more6',name:'More Than 6'},
  ]

 selectedSis: any;

  register: FormGroup;
  formdata = new FormData();

  dataStepOne: any;
  jobselect: any;

  SelectedBroCount: any;
  brothersArray = [];
  sistersArray = [];
  modal: any;
  dataArray= {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider,   public modalCtrl: ModalController,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {
    this.dataArray = this.navParams.get('dataArray');
    this.jobselect = this.navParams.get('jobselect');
    this.SelectedBroCount = this.navParams.get('SelectedBroCount');

   //total Brothers Arary
   //this.brothersArray = this.navParams.get('brothersArray');
  // console.log('--brothersArray---',this.brothersArray);

   //total sisters array
   //this.sistersArray  = this.navParams.get('sistersArray');
  }

  ngOnInit() {

    this.register = new FormGroup({

         noofBrothers: new FormControl('', [Validators.required,]),
         noofSister: new FormControl('', [Validators.required,]),
         manglik: new FormControl('', [Validators.required,]),
         kuldevi: new FormControl('', [Validators.required,]),
         gotra: new FormControl('', [Validators.required,])
  
    });
  }


  goBack() {
    this.navCtrl.pop()
  }

  onSelectBrother(val:any){
    this.selectedBro = val.val;
    if(this.selectedBro > 0){
        this.BrotherModal(this.selectedBro);
    }else if(this.selectedBro == 0){
      this.selectedbroname = val.name;
    }
  }

 
  BrotherModal(value) {
    this.modal = this.modalCtrl.create(Brother1Page, {value: value});
    this.modal.onDidDismiss((data) => {
     
      this.brothersArray = data;
      console.log('---------------Modal from Data------------ ', this.brothersArray);     
    });
    this.modal.present();
  }

  onSelectSister(val:any){
    this.selectedSis = val.val;
 
    if(this.selectedSis > 0){
       this.SisterModal(this.selectedSis);
    }else if(this.selectedSis== 0 ){
  
    } 
  }
  SisterModal(value) {
    this.modal = this.modalCtrl.create(Sister1Page, {value: value});
    this.modal.onDidDismiss((data) => {
      this.sistersArray = data;
      console.log('---------------Modal from Data------------ ', this.sistersArray);
      
    });
    this.modal.present();
  }

  /*haveSisters(value) {
    this.modal = this.modalCtrl.create(SistersPage, {value: value});
    this.modal.onDidDismiss((data) => {
      // This is going to be executed when the modal is closed, so
      // you can get the data here
      this.dataFromModal = data;
      console.log('---------------Data from modal------------ ', this.dataFromModal);
      
    });
    this.modal.present();
  }
*/
  Register_Step2(data: any) {


    if (this.register.valid) {

     
      this.dataArray['noofBrothers'] = data.noofBrothers.val,
      this.dataArray['brothersArray'] = this.brothersArray,
      this.dataArray['noofSister'] = data.noofSister.val,
      this.dataArray['sistersArray'] = this.sistersArray,
      this.dataArray['manglik'] = data.manglik,
      this.dataArray['kuldevi'] = data.kuldevi,
      this.dataArray['gotra'] = data.gotra

        console.log('---------------unmarried2-----------',this.dataArray)

        this.navCtrl.push(UnmarriedStep3Page, {dataArray: this.dataArray,
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

