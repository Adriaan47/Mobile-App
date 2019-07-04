import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-memberinfo',
  templateUrl: './memberinfo.component.html',
  styleUrls: ['./memberinfo.component.scss'],
})
export class MemberinfoComponent implements OnInit {

mainuser: AngularFirestoreDocument;
profilePic: string;
sub;
data: any;


  constructor(  private popoverController: PopoverController, private users: UsersService, private afs: AngularFirestore) {
    this.mainuser = afs.doc(`users/${this.users.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe(event => {
    this.profilePic = event.profilePic;
});

this.getMessage();
  }

  ngOnInit() {
    this.users.getData().subscribe(data => console.log(data));
  }

  getMessage() {
    this.users.getData().subscribe(data => this.data = data);
  }

  async DismissClick() {
    await this.popoverController.dismiss();
      }

}
