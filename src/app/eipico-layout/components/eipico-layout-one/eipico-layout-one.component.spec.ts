import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EipicoLayoutOneComponent } from './eipico-layout-one.component';

describe('EipicoLayoutOneComponent', () => {
  let component: EipicoLayoutOneComponent;
  let fixture: ComponentFixture<EipicoLayoutOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EipicoLayoutOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EipicoLayoutOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
