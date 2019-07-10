import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from '../services/users.service';
import { UserService } from '../user.service';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

// import { timingSafeEqual } from 'crypto';


@Component({
selector: 'app-edit-profile',
templateUrl: './edit-profile.page.html',
styleUrls: ['./edit-profile.page.scss'],
})

export class EditProfilePage implements OnInit {

constructor(
private users: UsersService,
private http: Http,
private afs: AngularFirestore,
private router: Router,
private storage: AngularFireStorage,
private alertController: AlertController,
private user: UserService,
// tslint:disable-next-line:no-shadowed-variable
public alertCtrl: AlertController) {

this.mainuser = afs.doc(`users/${this.users.getUID()}`);
this.sub = this.mainuser.valueChanges().subscribe(event => {
this.profilePic = event.profilePic;
this.email = event.email;
this.name = event.name;
this.surname = event.surname;
this.careerLevel = event.careerLevel;
this.mobile = event.mobile;
this.avatar = event.avatar;
this.nickname = event.nickname;
});

}

mainuser: AngularFirestoreDocument;
sub;

email: any;
name: string;
surname: string;
careerLevel: string;
mobile: string;
avatar: string;
nickname: string;

// tslint:disable-next-line: no-inferrable-types
busy: boolean = false;

@ViewChild('image') fileBtn: {
nativeElement: HTMLInputElement
};

username: any;
profilePic: any;
uid: any;
    // tslint:disable-next-line:member-ordering
    imgURL: any;
    selectedIMG: File = null;

ngOnInit() {
}

// tslint:disable-next-line: use-life-cycle-interface
ngOnDestroy() {
this.sub.unsubscribe();
}


async createPost() {

this.busy = true;
this.afs.doc(`users/${this.users.getUID()}`).update({
name : this.name,
surname: this.surname,
careerLevel: this.careerLevel,
email: this.email,
mobile: this.mobile,
avatar: this.avatar,
nickname: this.nickname,
});

this.router.navigate(['/tabs/profile']);
}

async presentAlert(title: string, content: string) {
const alert = await this.alertController.create({
header: title,
message: content,
buttons: ['OK']
});

await alert.present();
}

async updateDetails() {

if (this.username !== this.users.getUsername()) {
await this.users.updateEmail(this.username);
this.mainuser.update({
username: this.username,
});
}

// await this.presentAlert('Update success', 'Your profile was updated');

// this.router.navigate(['/tabs/profile']);
}
async presentAlertConfirm() {
// this.router.navigate(['/tabs/profile']);
// }
const alert = await this.alertCtrl.create({
header: 'Update successful',
message: 'Your profile has been updated',
buttons: [
{
text: 'OK',
handler: () => {
 this.router.navigate(['/tabs/profile']);
this.refresh();

}

}
]
// tslint:disable-next-line: semicolon
});
await alert.present();
}
 async presentAlertBack() {
    const alert = await this.alertCtrl.create({
      header: 'Discard changes?',
      message: 'Any unsaved work will be discarded.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: ?');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['tabs/profile']);
          }
        }
      ]
  // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }


updateProfilePicture() {
    this.fileBtn.nativeElement.click();
}

    uploadImg(file: any) {
    this.selectedIMG = file.files[0];
    file = this.selectedIMG;
    console.log(file);
    const filePath = `profile/${this.users.getUID()}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).snapshotChanges().pipe(
    finalize(() => fileRef.getDownloadURL().subscribe((url) => {
    this.imgURL = url;
    const imgage: string = this.imgURL;
    this.afs.collection(`users`)
    .doc(this.users.getUID())
    .update({
    profilePicture: imgage,
    }).catch(err => {
    return err.message;
    });
    })
    )
    ).subscribe();
    }

    refresh(): void {
        window.location.reload();
    }
}
