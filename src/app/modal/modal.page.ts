/**
*Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RideInfoService } from '../ride-info.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss']
})
export class ModalPage implements OnInit {
  @Input() rideInfo: any;
  public lat: number;
  public lng: number;
  public originAddr: any;
  public destinationAddr: any;
  public driver: string;
  public customer: string;

  constructor(
    public modalController: ModalController,
    private ride: RideInfoService
  ) {
    this.lat = 51.678418;
    this.lng = 7.809007;
    this.originAddr = '161/184,kumbha marg,Sunny Nagar,Sanganer,Sector 16, Paratap Nagar,Jaipur,Rajasthan 302033,India';
    this.destinationAddr = '1-Modani bhawan Jagdish marg bani park jaipur,Rajasthan 302016';
  }

  ngOnInit() {
    this.ride
      .getOrigin(this.rideInfo)
      .then(res => {
        console.log(res);
        const data = JSON.parse(res['_body']);
        if (data && data['results'] && data['results'][0]) {
          this.originAddr = data['results'][0].formatted_address;
        }
      })
      .catch(err => console.log(err));

    setTimeout(() => {
      this.ride
        .getDestination(this.rideInfo)
        .then(res => {
          console.log(res);
          const data = JSON.parse(res['_body']);
          if (data && data['results'] && data['results'][0]) {
            this.destinationAddr = data['results'][0].formatted_address;
          }
        })
        .catch(err => console.log(err));
    }, 2000);

    this.ride.getDriver(this.rideInfo).then(res => {
      this.driver = res['email'];
    });

    this.ride.getCustomer(this.rideInfo).then(res => {
      this.customer = res['name'];
    });
  }

  goBack() {
    this.modalController.dismiss();
  }
}
