
/**
*Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss']
})
export class DriversPage implements OnInit {
  drivers: any;
  filterDrivers: any = [];
  constructor(private afs: AngularFirestore) {
    this.getData();
  }

  getData() {
    this.afs
      .collection('drivers')
      .snapshotChanges()
      .pipe(
        map(response => {
          return response.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      )
      .subscribe(docs => {
        this.drivers = docs;
      });
  }

  ngOnInit() {}

  segmentChanged(ev) {
    this.filterDrivers = [];
    const checkAppr = ev.detail.value;
    this.drivers.forEach(driver => {
      if (driver.approved.toString() === checkAppr) {
        this.filterDrivers.push(driver);
      }
    });
  }

  toggleChanged(ev, driverId) {
    const check = ev.detail.checked;
    this.afs
      .collection('drivers')
      .doc(driverId)
      .update({
        approved: check
      })
      .then(() => {
        this.filterDrivers = [];
      });
  }
}
