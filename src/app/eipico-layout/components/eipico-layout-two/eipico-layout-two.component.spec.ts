import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EipicoLayoutTwoComponent } from './eipico-layout-two.component';

describe('EipicoLayoutTwoComponent', () => {
  let component: EipicoLayoutTwoComponent;
  let fixture: ComponentFixture<EipicoLayoutTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EipicoLayoutTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EipicoLayoutTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
