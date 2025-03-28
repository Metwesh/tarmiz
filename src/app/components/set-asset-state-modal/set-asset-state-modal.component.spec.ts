import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAssetStateModalComponent } from './set-asset-state-modal.component';

describe('SetAssetStateModalComponent', () => {
  let component: SetAssetStateModalComponent;
  let fixture: ComponentFixture<SetAssetStateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetAssetStateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetAssetStateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
