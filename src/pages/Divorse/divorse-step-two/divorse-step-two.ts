import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { Brother1Page } from '../../Brothers/brother1/brother1';
import { Sister1Page } from '../../Sisters/sister1/sister1';
import { DivorseStepThreePage } from '../divorse-step-three/divorse-step-three';



//@IonicPage()
@Component({
  selector: 'page-divorse-step-two',
  templateUrl: 'divorse-step-two.html',
})
export class DivorseStepTwoPage {
  public url = "assets/imgs/profile.png";
  dataArray = {};
  Brothers=[
    {val:'0',name:'No Brother'},
    {val:'1',name:'1 Brother'},
    {val:'2',name:'2 Brothers'},
    {val:'3',name:'3 Brothers'},
    {val:'4',name:'4 Brothers'},
    {val:'5',name:'5 Brothers'},
   // {val:'more6',name:'More Than 6'},
  ]
  Noofbrothers:any;
  selectedBro: any;

  Sisters=[
    {val:'0',name:'No Sister'},
    {val:'1',name:'1 Sister'},
    {val:'2',name:'2 Sisters'},
    {val:'3',name:'3 Sisters'},
    {val:'4',name:'4 Sisters'},
    {val:'5',name:'5 Sisters'},
   // {val:'more6',name:'More Than 6'},
  ]
  noofSister:any;
 selectedSis: any;

  register: FormGroup;
  formdata = new FormData();

  
  jobselect: any;
 
  brothersArray = [];
  sistersArray = [];
  modal: any;
  selectedbroname: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider, public modalCtrl: ModalController,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {

    this.jobselect = this.navParams.get('jobselect');
    //console.log('jobselected Step two---',this.jobselect);
    this.dataArray = this.navParams.get('dataArray');

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


  Register_Step2(data: any) {


    if (this.register.valid) {

        this.dataArray['noofBrothers'] = data.noofBrothers.val,
        this.dataArray['brothers'] = this.brothersArray,
        this.dataArray['noofSister'] = data.noofSister.val,
        this.dataArray['sisters'] = this.sistersArray,
        this.dataArray['manglik'] = data.manglik,
        this.dataArray['kuldevi'] = data.kuldevi,
        this.dataArray['gotra'] = data.gotra
  
  
  
          console.log('---------------Divourse2-----------',this.dataArray)
  
      
        this.navCtrl.push(DivorseStepThreePage,{dataArray: this.dataArray,
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

