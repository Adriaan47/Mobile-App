import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { UsersService } from '../services/users.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-croping',
  templateUrl: './croping.component.html',
  styleUrls: ['./croping.component.scss'],
})
export class CropingComponent implements OnInit {
  form: FormGroup = new FormGroup({
    image: new FormControl(),
  });

  imageChangedEvent: any = '';
  croppedImage: any = '';
  uid: string;
  imgURL: any;
  selectedIMG: File = null;

  constructor(
    public memberSVC: UsersService,
    private router: Router,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private location: Location,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.uid = this.memberSVC.getUID();
    // get profile picture
    this.memberSVC.getPictures(this.uid).subscribe(pictures => {
      return this.croppedImage = pictures.profilePicture;
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.selectedIMG = new File([event.file], fileBeforeCrop.name,
      { type: fileBeforeCrop.type });
  }

  uploadImg() {
    const filePath = `profile/${this.uid}/${this.selectedIMG.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedIMG).snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe((url) => {
        this.imgURL = url;
        const imgage: string = this.imgURL;
        this.afs.collection(`users`)
          .doc(this.uid)
          .update({
            profilePicture: imgage,
          }).then(() => {
            this.presentAlert('Upload image', 'Uploaded successfully').then(() => {
              this.router.navigate(['tabs/edit-profile']);
            });
          }).catch(err => {
            return err.message;
          });
      })
      )
    ).subscribe();
  }
  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }
  onCancel() {
    this.router.navigate(['tabs/edit-profile']);
  }
}
