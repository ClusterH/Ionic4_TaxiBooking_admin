/**
*Ionic 4 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersPageModule) },
  { path: 'drivers', loadChildren: () => import('./drivers/drivers.module').then(m => m.DriversPageModule) },
  { path: 'ride-history', loadChildren: () => import('./ride-history/ride-history.module').then(m => m.RideHistoryPageModule) },
  { path: 'modal', loadChildren: () => import('./modal/modal.module').then(m => m.ModalPageModule) },
  // { path: 'vehiclemanagement', loadChildren: './vehiclemanagement/vehiclemanagement.module#VehiclemanagementPageModule' },
  // { path: 'addnewmodel', loadChildren: './addnewmodel/addnewmodel.module#AddnewmodelPageModule' },
  { path: 'addnewmodel', loadChildren: () => import('./addnewmodel/addnewmodel.module').then(m => m.AddnewmodelPageModule) },
  { path: 'vehiclemanagement', loadChildren: () => import('./vehiclemanagement/vehiclemanagement.module').then(m => m.VehiclemanagementPageModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
