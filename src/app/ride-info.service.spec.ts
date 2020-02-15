
/**
*Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { TestBed } from '@angular/core/testing';

import { RideInfoService } from './ride-info.service';

describe('RideInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RideInfoService = TestBed.get(RideInfoService);
    expect(service).toBeTruthy();
  });
});
