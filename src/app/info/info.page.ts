import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormArray } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Skills } from '../services/skills';
import { UsersService } from '../services/users.service';
import { UserService } from '../user.service';
import { NotifiticationsComponent } from './notifitications/notifitications.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  res: any;
  skills: any;
  Skills: Skills[];
  skillID: Skills;
  uid: string;

// tslint:disable-next-line: no-inferrable-types

// tslint:disable-next-line: no-inferrable-types

// tslint:disable-next-line: max-line-length
  constructor (

// tslint:disable-next-line: deprecation
    private http: Http,
    public router: Router,
    private afs: AngularFirestore,
    private users: UsersService,
    private alertCtrl: AlertController,
    public popoverController: PopoverController,
        ) {
    this.getSkills();

    }

  ngOnInit() {
    this.uid = this.users.getUID();
    this.users.getSkills(this.uid).subscribe((res: Skills[]) => {
      this.skills = res;
      console.log(res);
   });
   this.users.getDatas(this.users.getUID()).subscribe(res => {
    this.res = res;
  });
  }

 getSkills() {
    this.users.getSkills(this.users.getUID()).subscribe(skills => this.skills = skills);
  }

    async presentAlertConfirm() {
      const alert = await this.alertCtrl.create({
        header: 'Logout?',
        message: 'Are you sure you want to logout?',
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
              this.router.navigate(['/login']);
            }
          }
        ]
    // tslint:disable-next-line: semicolon
      });
      await alert.present();
    }

    async notifications(ev: any) {
      const popover = await this.popoverController.create({
          component: NotifiticationsComponent,
          event: ev,
          animated: true,
          showBackdrop: true
      });
      return await popover.present();
  }

  async DismissClick() {
    await this.popoverController.dismiss();
      }
delete(itemid) {
this.afs.doc('members');
}

deleteSkill(id: string) {
  this.users.deleteSkill(this.users.getUID(), id ).subscribe((res) => {
    this.res = res;
    console.log(res);

  });
}

}
