import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { FormGroup, FormBuilder } from "@angular/forms";
// import { FirestoreService } from '../firestore.service';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UUID } from 'angular2-uuid';
import { UtilService } from '../util.service';
import { StorageService } from '../filestorage.service';
import { FirestoreService } from '../firestore.service';




@Component({
  selector: 'app-addnewmodel',
  templateUrl: './addnewmodel.page.html',
  styleUrls: ['./addnewmodel.page.scss'],
})
export class AddnewmodelPage implements OnInit {
  modelForm: FormGroup;
  modelImgPath: '';
  // originmodelImgPath: '';

  constructor(
    public route: Router,
    public navctrl: NavController,
    // private fts: FirestoreService,
    public fb: FormBuilder,
    public http: HttpClient,
    public loadCtrl: LoadingController,
    public toastController: ToastController,
    public util: UtilService,
    public camera: Camera,
    private storageServ: StorageService,
    private firestore: FirestoreService,
    private actionCtrl: ActionSheetController,

    ) { }
 
 
  ngOnInit() {
    this.modelForm = this.fb.group({
      // brand: [''],
      model: [''],
      speed: [''],
      price: [''],
      member: [''],
      img_path: [''],
    })
  }

  async formSubmit() {
    const loading = await this.loadCtrl.create({
      message: 'Adding New Models ...'
    })
    await loading.present();

    if (!this.modelForm.valid) {
      loading.dismiss();
      return false;
    } else {
      const obj = {};
      console.log(this.modelImgPath);
      // obj['brand'] = this.modelForm.value.brand;
      obj['model'] = this.modelForm.value.model;
      obj['speed'] = this.modelForm.value.speed;
      obj['price'] = this.modelForm.value.price;
      obj['member'] = this.modelForm.value.member;
      obj['img_path'] = this.modelImgPath;
     
      console.log(obj);

      this.http
        .post(
          'https://us-central1-iondriverhapp.cloudfunctions.net/addModels',
          obj
        )
        .subscribe(async (res: any) => {
          loading.dismiss();
          console.log(res);
          if (res && res.status === 'done') {
            console.log(res);
            loading.dismiss();
            
            this.route.navigate(['vehiclemanagement']);
          }
        });
        
    }
  }

  async openActionsheet() {
    const action = await this.actionCtrl.create({
      buttons: [{
        text: 'Take a picture',
        role: 'destructive',
        cssClass: 'buttonCss',
        handler: () => {
          this.openCamera();
        }
      }, {
        text: 'Pick From Gallery',
        handler: () => {
          this.openGallery();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'buttonCss_Cancel',
        handler: () => {

        }
      }]
    });
    await action.present();
  }
  openCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();
      // let name = url.split('/');
      // this.originmodelImgPath = url;
      this.util.makeFileIntoBlob(url, name).then(imageData => {
        this.util.openInfLoader();
        this.storageServ.uploadContent(imageData, name).then(
          success => {
            this.util.closeLoading()
            this.util.presentToast('image uploded', true, 'bottom', 2100);
            console.log('success', success);
            this.modelImgPath = success.url;
          }

        ).catch(err => {
          this.util.closeLoading();
          this.util.presentToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        })
      })
    }).catch(err => { });
  }
  public openGallery() {
    const options: CameraOptions = {
      quality: 60,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();
      console.log("url", url, "name", name);
      // this.originmodelImgPath = url;

      this.util.makeFileIntoBlob(url, name).then(imageData => {
        console.log('imageData', imageData);
        this.util.openInfLoader();
        this.storageServ.uploadContent(imageData, name).then(
          success => {
            this.util.closeLoading()
            this.util.presentToast('image uploded', true, 'bottom', 2100);
            console.log('success', success);
            this.modelImgPath = success.url;
          }
        ).catch(err => {
          this.util.closeLoading();
          this.util.presentToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        });
      });
    }).catch(err => {
      console.log('errrrr', err);
    });
  }
  
 
  openpageTRansition() {
    // this.route.navigate(['vehiclemanagement']);
    this.navctrl.back();
  }
}
