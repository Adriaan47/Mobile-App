import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-skilldata',
  templateUrl: './skilldata.component.html',
  styleUrls: ['./skilldata.component.scss'],
})
export class SkilldataComponent implements OnInit {
// tslint:disable-next-line: no-input-rename
  @Input('name') skilldata: any;

  constructor(private toastCrtl: ToastController) { }

  ngOnInit() {}

}
