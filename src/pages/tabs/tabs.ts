import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PeoplePage } from '../people/people';
import { SettingsPage } from '../settings/settings';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabsEnabled = true;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = PeoplePage;
  tab5Root = SettingsPage;

 
      constructor() {
     
      }

        
    enableTabs(enable: boolean): void {
      this.tabsEnabled = enable;
    }
}
