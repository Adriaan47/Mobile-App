import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-about-skill',
  templateUrl: './about-skill.page.html',
  styleUrls: ['./about-skill.page.scss'],
})
export class AboutSkillPage implements OnInit {

mainuser: AngularFirestoreDocument;
skills;
sub;

// tslint:disable-next-line: no-inferrable-types
busy: boolean = false;

  constructor(
    private http: Http,
    public router: Router,
    private afs: AngularFirestore,
    private user: UserService,
    private alertCtrl: AlertController,
  ) {
    this.mainuser = afs.doc(`members/${user.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
    this.skills = event.skills;
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Discard changes?',
      message: 'Are you sure you want to discard changes?',
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
            this.router.navigate(['/tabs/info']);
          }
        }
      ]
  // tslint:disable-next-line: semicolon
    });
    await alert.present();
  }
  async presentAlertConfirm2() {
    //   this.router.navigate(['/tabs/profile']);
    // }
      const alert = await this.alertCtrl.create({
        header: 'Update successful',
        message: 'Your profile has been updated',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/tabs/info']);
            }
          }
        ]
    // tslint:disable-next-line: semicolon
      });
      await alert.present();
    }

  ngOnInit() {
  }

}
