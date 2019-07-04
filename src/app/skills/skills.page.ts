import { firestore } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { Users } from '../services/users.interface';
import { UserService } from '../user.service';
import { UsersService } from '../services/users.service';
import { Skills } from '../services/skills';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-skills',
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],
  providers: [Keyboard]
})
export class SkillsPage implements OnInit {
  id?: string;
  name: string;
  origin: string;
  level: number;
  lastUsed: Date;
  activeExperience: number;
  active: boolean;

  mainuser: AngularFirestoreDocument;
  skill: string;
  // level: string;
  last_used: string;
  // origin: string;
  months_active: string;
  developing: string;

  skills;
  sub;
// tslint:disable-next-line: no-inferrable-types
  busy: boolean = false;
  res: Object;

// tslint:disable-next-line: max-line-length
  constructor(public router: Router, private afs: AngularFirestore, private users: UsersService,  private alertCtrl: AlertController, private keyboard: Keyboard) {
      this.mainuser = afs.doc(`users/${users.getUID()}`);
      this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.skills = event.skills;
      });
    }



    async createPost() {
      this.busy = true;
      const skill = this.name;
      const level = this.level;
      const last_used = this.lastUsed;
      const origin = this.origin;
      const months_active = this.activeExperience;
      const developing = this.active;

      this.afs.doc(`skills/${this.users.getUID()}`).update({
        skills: firestore.FieldValue.arrayUnion({
          skill,
          level,
          last_used,
          origin,
          months_active,
          developing
        })
        });

      this.router.navigate(['/tabs/info']);
      }



    // async createPost() {
    //   this.busy = true;
    //   const skill = this.skill;
    //   const level = this.level;
    //   const last_used = this.last_used;
    //   const origin = this.origin;
    //   const months_active = this.months_active;
    //   const developing = this.developing;

    //   this.afs.doc(`users/${this.users.getUID()}`).update({
    //     skills: firestore.FieldValue.arrayUnion({
    //       skill,
    //       level,
    //       last_used,
    //       origin,
    //       months_active,
    //       developing
    //     })
    //     });

    //   this.router.navigate(['/tabs/info']);
    //   }

  ngOnInit() {
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
  async presentAlertConfirm1() {
    //   this.router.navigate(['/tabs/profile']);
    // }
      const alert = await this.alertCtrl.create({
        header: 'Skill added successfully',
        message: 'Your new skill has has been added',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/tabs/info']);
              this.refresh();
            }
          }
        ]
    // tslint:disable-next-line: semicolon
      });
      await alert.present();
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
              this.router.navigate(['tabs/info']);
            }
          }
        ]
    // tslint:disable-next-line: semicolon
      });
      await alert.present();
    }
  openkeypad() {
    this.keyboard.show();
  }

  CreateSkill (skill: NgForm) {
    console.log(skill.value);
    this.users.createSkill(this.users.getUID(), skill.value ).subscribe((res) => {
      this.res = res;
    });
  }
  refresh(): void {
    window.location.reload();
    this.router.navigate(['tabs/info']);
}
}
