import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { ModelService } from '../modelservice';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-vehiclemanagement',
  templateUrl: './vehiclemanagement.page.html',
  styleUrls: ['./vehiclemanagement.page.scss'],
})
export class VehiclemanagementPage implements OnInit {
  // constructor(public modalCtrl: ModalController, public nativePageTransitions: NativePageTransitions,  private fts: FirestoreService) { }

  models: any;
  constructor(private afs: AngularFirestore, public route: Router,) {}

  ngOnInit() {
    this.models = this.afs.collection('models').valueChanges();
  }

  openpageTRansition() {
    this.route.navigate(['addnewmodel']);
  }
 
}
