import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilldataComponent } from './skilldata.component';

describe('SkilldataComponent', () => {
  let component: SkilldataComponent;
  let fixture: ComponentFixture<SkilldataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkilldataComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkilldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
