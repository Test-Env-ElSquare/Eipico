import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProductionComponent } from './total-production.component';

describe('TotalProductionComponent', () => {
  let component: TotalProductionComponent;
  let fixture: ComponentFixture<TotalProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalProductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
