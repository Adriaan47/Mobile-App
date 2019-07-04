import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items: any = [];

  constructor() {
    this.items = [
      { title: 'JavaScript' },
      { title: 'Angular JS' },
      { title: 'Ptyhon OOP' },
      { title: 'TypeScript' },
      { title: 'MongoDB' },
      { title: 'SQL' }
    ];
  }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
