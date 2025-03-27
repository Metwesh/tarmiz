import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInnerComponent } from './asset-inner.component';

describe('AssetInnerComponent', () => {
  let component: AssetInnerComponent;
  let fixture: ComponentFixture<AssetInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetInnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
