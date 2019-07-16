import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropingComponent } from './croping.component';

describe('CropingComponent', () => {
  let component: CropingComponent;
  let fixture: ComponentFixture<CropingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
