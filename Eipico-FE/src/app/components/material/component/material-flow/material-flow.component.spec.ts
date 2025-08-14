import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFlowComponent } from './material-flow.component';

describe('MaterialFlowComponent', () => {
  let component: MaterialFlowComponent;
  let fixture: ComponentFixture<MaterialFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
