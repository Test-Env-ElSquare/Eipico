import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAppCompComponent } from './test-app-comp.component';

describe('TestAppCompComponent', () => {
  let component: TestAppCompComponent;
  let fixture: ComponentFixture<TestAppCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAppCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAppCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
