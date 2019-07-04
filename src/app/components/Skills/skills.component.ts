import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {

// tslint:disable-next-line: no-input-rename
  @Input ('skills') skills: any;

  constructor(private toastCrtl: ToastController) { }

  ngOnInit() {}

}
