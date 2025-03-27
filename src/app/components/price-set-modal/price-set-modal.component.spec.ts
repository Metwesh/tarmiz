import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSetModalComponent } from './price-set-modal.component';

describe('PriceSetModalComponent', () => {
  let component: PriceSetModalComponent;
  let fixture: ComponentFixture<PriceSetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceSetModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceSetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
