import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

// tslint:disable-next-line: class-name
interface user {
username: string;
uid: string;

}

@Injectable()
export class UserService {
public user: user;
// tslint:disable-next-line: no-inferrable-types
private url: string = 'https://demoproject-8b1fa.appspot.com/users';


constructor(public afAuth: AngularFireAuth, private alertController: AlertController, private http: HttpClient) {

}

// tslint:disable-next-line: no-shadowed-variable
setUser(user: user) {
this.user = user;
}

getUsername(): string {
return this.user.username;
}

getName(): string {
    return this.user.username;
    }

    getData(): Observable<Object> {
        return this.http.get(this.url);
      }

      getDatas(id: string): Observable<Object> {
        return this.http.get(`https://demoproject-8b1fa.appspot.com/users/${id}`);
      }



reAuth(username: string, password: string) {
return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password));
}

updatePassword(newpassword: string) {
return this.afAuth.auth.currentUser.updatePassword(newpassword);
}

updateEmail(newemail: string) {
return this.afAuth.auth.currentUser.updateEmail(newemail);
}

async isAuthenticated() {
if (this.user) { return true; }

// tslint:disable-next-line: no-shadowed-variable
const user = await this.afAuth.authState.pipe(first()).toPromise();

if (user) {
this.setUser({
username: user.email.split('@')[0],
uid: user.uid
});

return true;
}
return false;
}

getUID() {
    if (!this.user) {
        if (this.afAuth.auth.currentUser) {
// tslint:disable-next-line: no-shadowed-variable
            const user = this.afAuth.auth.currentUser;
            this.setUser({
                username: user.email.split('@')[0],
                uid: user.uid
            });
            return user.uid;
        } else {
            throw new Error ('User not logged in');
        }    } else {
        return this.user.uid;
    }

}
// email link for reset password
resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
    this.presentAlert('Password reset', 'Password reset email sent, check your inbox.')
    }).catch(error => this.presentAlert('Error occured ', error.message));
    }
    
    async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
    header: title,
    message: content,
    buttons: ['OK']
    });
    await alert.present();
    } 
}
