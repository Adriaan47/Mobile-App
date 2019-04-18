import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
{
path: '',

component: TabsPage,
children: [
{ path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
{ path: 'demo', loadChildren: '../demo/demo.module#DemoPageModule' },
{ path: 'skills', loadChildren: '../skills/skills.module#SkillsPageModule' },
{ path: 'info', loadChildren: '../info/info.module#InfoPageModule' },
{ path: 'projects', loadChildren: '../projects/projects.module#ProjectsPageModule' },
{ path: 'edit-profile', loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule' },

// tslint:disable-next-line: indent
        ]
    }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TabsRoutingModule { }
