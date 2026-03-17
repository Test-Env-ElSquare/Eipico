import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTwoCopyComponent } from './layout-two-copy.component';

describe('LayoutTwoCopyComponent', () => {
  let component: LayoutTwoCopyComponent;
  let fixture: ComponentFixture<LayoutTwoCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutTwoCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTwoCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
