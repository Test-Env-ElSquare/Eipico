import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeconReportComponent } from './becon-report.component';

describe('BeconReportComponent', () => {
  let component: BeconReportComponent;
  let fixture: ComponentFixture<BeconReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeconReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeconReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
