import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

username = '';
password = '';
cpassword = '';

constructor(
public afAuth: AngularFireAuth,
public afstore: AngularFirestore,
public user: UserService,
public alertController: AlertController,
public router: Router,
public toastController: ToastController
) { }

ngOnInit() {
}

async presentAlert(title: string, content: string) {
const alert = await this.alertController.create({
  header: 'Success',
      subHeader: 'Welcome aboard',
      message: 'You have successfully registered to the Project Info Platform.',
      buttons: ['OK']
    });

    await alert.present();
  }

async register() {
const { username, password, cpassword } = this;
if (password !== cpassword) {
const toast = await this.toastController.create({
  message: 'Incorrect password or email!.',
  duration: 3000,
  color: 'danger'
});
toast.present();
console.log('passwords do not match');
}

try {
const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);

const a = this.afstore.doc(`members/${res.user.uid}`).set({
username,
});

const b = this.user.setUser({
username,
uid: res.user.uid
});

this.router.navigate(['/tabs/profile']);
console.log(a);

} catch (error) {
console.dir(error);
}
}

}
