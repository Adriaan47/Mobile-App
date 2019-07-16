import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { EditProfilePage } from './edit-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ImageCropperModule
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
