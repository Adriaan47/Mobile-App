import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  information: any[];
  automaticClose = false;


  constructor(
    private alertCtrl: AlertController,
    public router: Router,
    private http: HttpClient, ) {

    this.http.get('assets/information.json').subscribe(res => {
    this.information = res['data'];
    this.information[0].open = false;
    });
  }


  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Logout?',
      message: 'Are you sure you would like to logout',
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

  toogleSelection(index) {
    this.information[index].open = !this.information[index].open;

    if (this.automaticClose && this.information[index].open) {
      this.information
        // tslint:disable-next-line: triple-equals
        .filter((data, dataIndex) => dataIndex != index)
        .map((data => data.open = false));

    }

  }

  toogleItem(index, childIndex) {
    this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;

  }



}
