import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewmodelPage } from './addnewmodel.page';

describe('AddnewmodelPage', () => {
  let component: AddnewmodelPage;
  let fixture: ComponentFixture<AddnewmodelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewmodelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewmodelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
