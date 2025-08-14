import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainScadaComponent } from './main-scada.component';

describe('MainScadaComponent', () => {
  let component: MainScadaComponent;
  let fixture: ComponentFixture<MainScadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainScadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainScadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
