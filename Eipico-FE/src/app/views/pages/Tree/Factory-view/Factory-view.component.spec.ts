/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FactoryViewComponent } from './Factory-view.component';

describe('FactoryViewComponent', () => {
  let component: FactoryViewComponent;
  let fixture: ComponentFixture<FactoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
