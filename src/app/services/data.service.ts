import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private url: any = [];

  constructor(private http: HttpClient) {
    this.url  = 'https://demoproject-8b1fa.appspot.com/users';
  }

}


