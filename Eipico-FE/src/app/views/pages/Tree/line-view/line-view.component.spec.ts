/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LineViewComponent } from './line-view.component';

describe('LineViewComponent', () => {
  let component: LineViewComponent;
  let fixture: ComponentFixture<LineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
