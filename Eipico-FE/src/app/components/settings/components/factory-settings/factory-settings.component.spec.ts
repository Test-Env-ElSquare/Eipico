import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorySettingsComponent } from './factory-settings.component';

describe('FactorySettingsComponent', () => {
  let component: FactorySettingsComponent;
  let fixture: ComponentFixture<FactorySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorySettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
