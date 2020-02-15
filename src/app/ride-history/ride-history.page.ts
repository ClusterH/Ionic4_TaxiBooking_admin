/**
*Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, MenuController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { RideInfoService } from '../ride-info.service';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.page.html',
  styleUrls: ['./ride-history.page.scss']
})
export class RideHistoryPage implements OnInit {
  public rides: any;
  public lat: number;
  public lng: number;
  public origin: number;
  public destination: number;
  private loader: any;
  constructor(
    private afs: AngularFirestore,
    public modalController: ModalController,
    private menu: MenuController,
    private rideInfoService: RideInfoService
  ) {
    this.lat = 17.9519488;
    this.lng = 102.6326528;
  }

  async ngOnInit() {
    if (!this.loader) {
      this.loader = await this.rideInfoService.loading('Loading history ...');
      this.loader.present();
    }
    this.afs
      .collection('completedRides')
      .valueChanges()
      .subscribe(res => {
        this.rides = res,
        this.loader.dismiss();
      }, error=>{
        this.loader.dismiss();
      });
     
  }

  ionViewDidEnter() {
    this.menu.enable(true, 'start');
    this.menu.enable(true, 'end');
  }

  async showInfo(ride) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { rideInfo: ride }
    });
    return await modal.present();
  }
}
