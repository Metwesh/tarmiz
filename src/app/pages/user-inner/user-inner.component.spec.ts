import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInnerComponent } from './user-inner.component';

describe('UserInnerComponent', () => {
  let component: UserInnerComponent;
  let fixture: ComponentFixture<UserInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
