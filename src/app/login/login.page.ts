import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ReactiveFormsModule , Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  username: string = '';
  // tslint:disable-next-line: no-inferrable-types
  password: string = '';


  // tslint:disable-next-line:max-line-length
  constructor(
    public afAuth: AngularFireAuth,
    public user: UserService,
    public router: Router,
    public toastController: ToastController,
    private splashScreen: SplashScreen) {

  }

  ngOnInit() {
    this.splashScreen.show();
  }
  async login() {
    // tslint:disable-next-line: indent
    const { username, password } = this;
    // this.username = '';
    // this.password = '';
    // tslint:disable-next-line: indent
    try {
      // tslint:disable-next-line: indent
      // Only sign in with accenture email
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@accenture.com', password);

      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        });

        this.router.navigate(['/tabs']);
        console.log(username);
      }

    } catch (err) {
      console.log(err);
      const toast = await this.toastController.create({
        message: 'Incorrect password or email!.',
        duration: 3000,
        color: 'danger'
      });
      toast.present();

    }
  }
}

