import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public person:any;

  constructor( public navCtrl: NavController,public data:DataProvider,public navParams: NavParams,
    public platform: Platform) {
    //console.log(this.navCtrl.id)
    platform.ready().then(() => {
                //this.person = this.data.paramDataperson;
                console.log('equal',this.person);
                this.person = navParams.get('item');
         });
        
        }
  }

