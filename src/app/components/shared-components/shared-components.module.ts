import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { SkillsComponent } from '../Skills/skills.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProductComponent, SkillsComponent ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ProductComponent, SkillsComponent]
})
export class SharedComponentsModule { }
