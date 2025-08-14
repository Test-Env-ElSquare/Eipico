import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleStatusComponent } from './scale-status.component';

describe('ScaleStatusComponent', () => {
  let component: ScaleStatusComponent;
  let fixture: ComponentFixture<ScaleStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
