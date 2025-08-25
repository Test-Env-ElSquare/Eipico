import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfPartsComponent } from './number-of-parts.component';

describe('NumberOfPartsComponent', () => {
  let component: NumberOfPartsComponent;
  let fixture: ComponentFixture<NumberOfPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberOfPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
