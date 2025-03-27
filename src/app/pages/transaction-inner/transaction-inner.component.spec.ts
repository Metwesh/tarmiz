import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInnerComponent } from './transaction-inner.component';

describe('TransactionInnerComponent', () => {
  let component: TransactionInnerComponent;
  let fixture: ComponentFixture<TransactionInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionInnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
