
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ShareModule } from './share.module';
import { UsersService } from './services/users.service';
import { NotifiticationsComponent } from './info/notifitications/notifitications.component';
import { HttpClientModule } from '@angular/common/http';
import { MemberinfoComponent } from './members/memberinfo/memberinfo.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';


@NgModule({
  declarations: [AppComponent, NotifiticationsComponent, MemberinfoComponent],
  entryComponents: [NotifiticationsComponent, MemberinfoComponent],
  imports: [
HttpClientModule,
BrowserModule,
IonicModule.forRoot(),
AppRoutingModule,
AngularFireModule.initializeApp(firebaseConfig),
AngularFireAuthModule,
AngularFirestoreModule,
AngularFireStorageModule,
// tslint:disable-next-line: deprecation
HttpModule,
ShareModule
// ShareModule
],
  providers: [
    StatusBar,
    SplashScreen,
{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
UserService,
AuthService,
AngularFirestore,
UsersService,
{provide: StorageBucket, useValue: 'demoproject-8b1fa.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
