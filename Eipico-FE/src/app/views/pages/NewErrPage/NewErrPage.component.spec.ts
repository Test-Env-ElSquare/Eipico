/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewErrPageComponent } from './NewErrPage.component';

describe('NewErrPageComponent', () => {
  let component: NewErrPageComponent;
  let fixture: ComponentFixture<NewErrPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewErrPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewErrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
