import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { GlobleServiceProvider } from '../providers/globle-service/globle-service';
import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = StepThreePage; 
  rootPage:any = LoginPage;
  user_id: string;
// rootPage:any = SliderPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public globle: GlobleServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#0f3141');
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#002f80');
      splashScreen.hide();

      if (window.localStorage.getItem('id')) {
        this.user_id = window.localStorage.getItem('id');
        this.globle.setGlobleVariable();
        this.rootPage = TabsPage;

      }
      else {
        window.localStorage.clear();
   // this.rootPage = StepThreePage;
   this.rootPage = LoginPage;
      }


    });
  }
}
