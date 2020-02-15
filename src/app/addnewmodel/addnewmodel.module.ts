import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddnewmodelPage } from './addnewmodel.page';
import { ModelService } from '../modelservice';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    component: AddnewmodelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    HttpClientModule,

    RouterModule.forChild(routes)
  ],
  providers: [
    ModelService,
  ],
  declarations: [AddnewmodelPage]
})
export class AddnewmodelPageModule {}
