import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { CropingComponent } from './croping/croping.component';
import { RefreshComponent } from './refresh/refresh.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthService]  },
  { path: 'edit-details/:id', loadChildren: './edit-details/edit-details.module#EditDetailsPageModule' },
  { path: 'members', loadChildren: './members/members.module#MembersPageModule' },
  { path: 'upload-picture', component: CropingComponent },
  { path: 'user-details/:id', loadChildren: './user-details/user-details.module#UserDetailsPageModule' },
  { path: 'refresh', component: RefreshComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
