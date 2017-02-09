import { Component, ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {NativeStorage} from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform) {

    platform.ready().then(() => {
      /*// Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();*/

      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      let env = this;
      NativeStorage.getItem('user')
      .then( function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        console.log("estoy registrado");
        env.nav.push(TabsPage);
        Splashscreen.hide();
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        env.nav.push(LoginPage);
        console.log("aun no me registro");
        Splashscreen.hide();
      });

      StatusBar.styleDefault();
    });

  }
}
