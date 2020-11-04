import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PeoplePage } from '../pages/people/people';
import { SettingsPage } from '../pages/settings/settings';
import { DataProvider } from '../providers/data/data';
import { LoginPage } from '../pages/login/login';
import { OtpPage } from '../pages/otp/otp';
import { SliderPage } from '../pages/slider/slider';
import { RegisterPage } from '../pages/register/register';
import { DefineProvider } from '../providers/define/define';
import { ServiceProvider } from '../providers/service/service';
import { GlobleServiceProvider } from '../providers/globle-service/globle-service';
import { SplashProvider } from '../providers/splash/splash';
import { UrlProvider } from '../providers/url/url';
import { HttpClientModule } from '@angular/common/http';

import { StepOnePage } from '../pages/register/step-one/step-one';
import { StepTwoPage } from '../pages/register/step-two/step-two';
import { StepThreePage } from '../pages/register/step-three/step-three';
import { StepFourPage } from '../pages/register/step-four/step-four';
import { LangServiceProvider } from '../providers/lang-service/lang-service';
import { DivorseRegisterPage } from '../pages/Divorse/divorse-register/divorse-register';
import { MarriedRegisterPage } from '../pages/Married/married-register/married-register';
import { MarriedStepOnePage } from '../pages/Married/married-step-one/married-step-one';
import { MarriedStepTwoPage } from '../pages/Married/married-step-two/married-step-two';
import { MarriedStepThreePage } from '../pages/Married/married-step-three/married-step-three';
import { DivorseStepOnePage } from '../pages/Divorse/divorse-step-one/divorse-step-one';
import { DivorseStepTwoPage } from '../pages/Divorse/divorse-step-two/divorse-step-two';
import { DivorseStepThreePage } from '../pages/Divorse/divorse-step-three/divorse-step-three';
import { BusinessDetailsPage } from '../pages/Business/business-details/business-details';
import { BusinessStep1Page } from '../pages/Business/business-step1/business-step1';
import { BusinessStep2Page } from '../pages/Business/business-step2/business-step2';
import { BusinessStep3Page } from '../pages/Business/business-step3/business-step3';
import { JobStep1Page } from '../pages/Job/job-step1/job-step1';
import { JobStep2Page } from '../pages/Job/job-step2/job-step2';
import { JobStep3Page } from '../pages/Job/job-step3/job-step3';
import { JobDetailsPage } from '../pages/Job/job-details/job-details';
import { UnmarriedStep1Page } from '../pages/UnMarried/unmarried-step1/unmarried-step1';
import { UnmarriedStep2Page } from '../pages/UnMarried/unmarried-step2/unmarried-step2';
import { UnmarriedStep3Page } from '../pages/UnMarried/unmarried-step3/unmarried-step3';
import { Brother1Page } from '../pages/Brothers/brother1/brother1';
import { Brother2Page } from '../pages/Brothers/brother2/brother2';
import { Brother3Page } from '../pages/Brothers/brother3/brother3';
import { Brother4Page } from '../pages/Brothers/brother4/brother4';
import { Brother5Page } from '../pages/Brothers/brother5/brother5';
import { Sister1Page } from '../pages/Sisters/sister1/sister1';
import { Sister2Page } from '../pages/Sisters/sister2/sister2';
import { Sister3Page } from '../pages/Sisters/sister3/sister3';
import { Sister4Page } from '../pages/Sisters/sister4/sister4';
import { Sister5Page } from '../pages/Sisters/sister5/sister5';
import { Children1Page } from '../pages/Childrens/children1/children1';
import { Children2Page } from '../pages/Childrens/children2/children2';
import { Children3Page } from '../pages/Childrens/children3/children3';
import { Children4Page } from '../pages/Childrens/children4/children4';
import { Children5Page } from '../pages/Childrens/children5/children5';
import { NoBrothersPage } from '../pages/Brothers/no-brothers/no-brothers';
import { NoChildrensPage } from '../pages/Childrens/no-childrens/no-childrens';
import { NoSistersPage } from '../pages/Sisters/no-sisters/no-sisters';

import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { ValidatorProvider } from '../providers/validator/validator';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
/*
  PeoplePage,
   SettingsPage,
    LoginPage,
    RegisterPage,
    StepOnePage,
    StepTwoPage,
    StepThreePage,
    StepFourPage,
    NoBrothersPage,
    Brother1Page,Brother2Page,Brother3Page,Brother4Page,Brother5Page,
    NoSistersPage,
    Sister1Page,Sister2Page,Sister3Page,Sister4Page,Sister5Page,
    NoChildrensPage,
    Children1Page,Children2Page,Children3Page,Children4Page,Children5Page,
    UnmarriedStep1Page,
    UnmarriedStep2Page,
    UnmarriedStep3Page,
    MarriedRegisterPage,
    MarriedStepOnePage,
    MarriedStepTwoPage,
    MarriedStepThreePage,
    DivorseRegisterPage,
    DivorseStepOnePage,
    DivorseStepTwoPage,
    DivorseStepThreePage,
    JobDetailsPage,
    JobStep1Page,
    JobStep2Page,
    JobStep3Page,
    BusinessDetailsPage,
    BusinessStep1Page,
    BusinessStep2Page,
    BusinessStep3Page,
    OtpPage,
    SliderPage,*/
    TabsPage
    // SwipeTabDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PeoplePage,
    LoginPage,
    RegisterPage,
    StepOnePage,
    StepTwoPage,
    StepThreePage,
    StepFourPage,
    NoBrothersPage,
    Brother1Page,Brother2Page,Brother3Page,Brother4Page,Brother5Page,
    NoSistersPage,
    Sister1Page,Sister2Page,Sister3Page,Sister4Page,Sister5Page,
    NoChildrensPage,
    Children1Page,Children2Page,Children3Page,Children4Page,Children5Page,
    UnmarriedStep1Page,
    UnmarriedStep2Page,
    UnmarriedStep3Page,
    MarriedRegisterPage,
    MarriedStepOnePage,
    MarriedStepTwoPage,
    MarriedStepThreePage,
    DivorseRegisterPage,
    DivorseStepOnePage,
    DivorseStepTwoPage,
    DivorseStepThreePage,
    JobDetailsPage,
    JobStep1Page,
    JobStep2Page,
    JobStep3Page,
    BusinessDetailsPage,
    BusinessStep1Page,
    BusinessStep2Page,
    BusinessStep3Page,
    OtpPage,
    SliderPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    DefineProvider,
    ServiceProvider,
    LoadingController,
    ToastController,
    AlertController,
    ModalController,
    GlobleServiceProvider,
    SplashProvider, Camera, File, Base64, FileChooser, FilePath, ImagePicker,
    ScreenOrientation,
    UrlProvider,
    LangServiceProvider,
    ValidatorProvider,
    ValidatorProvider,
    ValidatorProvider,
  ]
})
export class AppModule {}
