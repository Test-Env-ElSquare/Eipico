import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchWeightComponent } from './batch-weight.component';

describe('BatchWeightComponent', () => {
  let component: BatchWeightComponent;
  let fixture: ComponentFixture<BatchWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
