import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VehiclemanagementPage } from './vehiclemanagement.page';

const routes: Routes = [
  {
    path: '',
    component: VehiclemanagementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VehiclemanagementPage]
})
export class VehiclemanagementPageModule {}
