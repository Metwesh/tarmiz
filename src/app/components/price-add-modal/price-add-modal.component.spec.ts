import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAddModalComponent } from './price-add-modal.component';

describe('PriceAddModalComponent', () => {
  let component: PriceAddModalComponent;
  let fixture: ComponentFixture<PriceAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
