import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSkillPage } from './about-skill.page';

describe('AboutSkillPage', () => {
  let component: AboutSkillPage;
  let fixture: ComponentFixture<AboutSkillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSkillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSkillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
