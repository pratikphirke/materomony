import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

//@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  options = {
    centeredSlides: true,
    slidesPerView: 1,
    //spaceBetween: -60,
  };

  categories = {
    slidesPerView: 2.5,
  };
  constructor(public navCtrl: NavController,public app:App, public navParams: NavParams) {
  }
  logout(){
    // this.navCtrl.setRoot(LoginPage);
    // document.getElementById("tabs").style.display="None";
     this.app.getRootNav().setRoot(LoginPage);
  
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
