import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { DefineProvider } from '../../../providers/define/define';
import { ServiceProvider } from '../../../providers/service/service';
import { SplashProvider } from '../../../providers/splash/splash';
import { BusinessStep1Page } from '../../Business/business-step1/business-step1';
import { Children1Page } from '../../Childrens/children1/children1';
import { JobDetailsPage } from '../../Job/job-details/job-details';


//@IonicPage()
@Component({
  selector: 'page-divorse-step-three',
  templateUrl: 'divorse-step-three.html',
})
export class DivorseStepThreePage {
  dataArray = {};
  Childrens=[
    {val:'0',name:'NO child'},
    {val:'1',name:'1 child'},
    {val:'2',name:'2 childrens'},
    {val:'3',name:'3 childrens'},
    {val:'4',name:'4 childrens'},
    {val:'5',name:'5 childrens'},
   // {val:'more6',name:'More Than 6'},
  ]
  register: FormGroup;
  formdata = new FormData();
  tearmError: boolean;
  jobselect: any;
  modal: any;
childrensArray = [];
  selectedChild: any;
  noofChildren:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ServiceProvider, public modalCtrl: ModalController,
    public DefineProvider: DefineProvider,
    public splash: SplashProvider) {
  }
  ionViewDidLoad() {

    this.jobselect = this.navParams.get('jobselect');
   // console.log('jobselected Step two---',this.jobselect);
   this.dataArray = this.navParams.get('dataArray');
  }

  ngOnInit() {

    this.register = new FormGroup({
      height: new FormControl('', [Validators.required,]),
      weight: new FormControl('', [Validators.required,]),
      skin: new FormControl('', [Validators.required,]),
      about: new FormControl('', [Validators.required,]),
      noofChildren: new FormControl('', [Validators.required,])
    });
  }
  
  onSelectChildren(val:any){
    this.selectedChild =val.val;
    if(this.selectedChild > 0){
      this.BrotherModal(this.selectedChild);

    }else if(this.selectedChild== 0){
      console.log(' NO child',this.selectedChild)
    }
   // console.log('NO OF children',this.selectedChild);

  }

  BrotherModal(value) {
    this.modal = this.modalCtrl.create(Children1Page, {value: value});
    this.modal.onDidDismiss((data) => {
     
      this.childrensArray = data;
      console.log('---------------Modal from Data childrensArray------------ ', this.childrensArray);     
    });
    this.modal.present();
  }

      
    goBack() {
      this.navCtrl.pop()
    }

  Register_Step3(data: any) {
    
    if (this.register.valid) {

        this.dataArray['height'] = data.height,
        this.dataArray['weight'] = data.weight,
        this.dataArray['skin'] = data.skin,
        this.dataArray['totalChildrens'] = data.noofChildren.val,
        this.dataArray['childrens'] = this.childrensArray,
        this.dataArray['about'] = data.about



        
         console.log('---------------divorse 3-----------',this.dataArray)
        console.log('*****Select Job**** ',this.jobselect)

      if(this.jobselect == "Business"){
        this.navCtrl.push(BusinessStep1Page, { dataArray: this.dataArray,
                                            jobselect:this.jobselect
                                          });
                                            
      }
      if(this.jobselect == "Job"){
        this.navCtrl.push(JobDetailsPage, {dataArray: this.dataArray,
                                          jobselect:this.jobselect
                                      });
                      
          }
    
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

