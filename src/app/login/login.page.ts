/**
*Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;
  public disabled;

  constructor(private menu: MenuController, private route: Router) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.menu.enable(false, 'start');
    this.menu.enable(false, 'end');
  }

  login() {
    console.log(`Email: ${this.email} and Password: ${this.password}`);
    // this.route.navigate(['/ride-history']);
    this.route.navigate(['/ride-history']);
  }
}
