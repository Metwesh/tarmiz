import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncSelectComponent } from './async-select.component';

describe('AsyncSelectComponent', () => {
  let component: AsyncSelectComponent;
  let fixture: ComponentFixture<AsyncSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsyncSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
