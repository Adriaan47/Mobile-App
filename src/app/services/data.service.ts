import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private url: any = [];

  constructor(private http: HttpClient) {
    this.url  = 'http://localhost:3000/users';
  }

}


