import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// tslint:disable-next-line: no-empty-interface
export interface EditDetails {
  name: string;
  cellphone: string;
  phone: string;
  occupation: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EditDetailsService {

  constructor(db: AngularFirestore) { }
}
