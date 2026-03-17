import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineCopyDetailsComponent } from './machine-copy-details.component';

describe('MachineCopyDetailsComponent', () => {
  let component: MachineCopyDetailsComponent;
  let fixture: ComponentFixture<MachineCopyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineCopyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineCopyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
