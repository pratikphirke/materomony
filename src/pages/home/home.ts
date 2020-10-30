import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { DefineProvider } from '../../providers/define/define';
import { ServiceProvider } from '../../providers/service/service';
import { SplashProvider } from '../../providers/splash/splash';
import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public samples = [
    {
      "id" : "01",
      "Name" : "ABC",
     "age" : "24",
    "city" : "Nashik",
    "hobbies":"music",
    "job":"private",
    "mobile":"1234567890",
    "color":"white"
     },
     {
      "id" : "02",
      "Name" : "PQR",
     "age" : "27",
    "city" : "Pune",
    "hobbies":"blogger",
    "job":"freelancer",
    "mobile":"8586841479",
    "color":"black"
     },
     {
       "id" : "03",
       "Name" : "XYZ",
     "age" : "26",
    "city" : "Mumbai",
    "hobbies":"sport",
    "job":"goverment",
    "mobile":"1234567890",
    "color":"white"
     },
  ]  
  userdata: any;

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    //spaceBetween: -60,
  };

  categories = {
    slidesPerView: 2.5,
  };
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public data:DataProvider,public app:App, public api: ServiceProvider,
     public DefineProvider: DefineProvider,
     public splash: SplashProvider
    ) {
    //console.log(this.navCtrl.id)
   // this.userdata = this.navParams.get('data');
  //  let uid = this.navParams.get('userid');
   // console.log('user data ',this.userdata);
    //console.log('curentuid ',uid);

  }




  itemTapped(item,itemid){
   if(item.id == itemid)
    {
      console.log('selected persion',item);
      this.navCtrl.push(AboutPage, 
        {item: item}
      );
    //  this.data.paramDataperson= item;
    //  this.data.paramDatapersonid= itemid;
     //this.navCtrl.parent.select(1);
    }
   
  }


  logout(){
   // this.navCtrl.setRoot(LoginPage);
   // document.getElementById("tabs").style.display="None";
    this.app.getRootNav().setRoot(LoginPage);
 
  }
}
