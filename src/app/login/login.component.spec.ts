import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTransferComponent } from './login.component';

describe('LoginTransferComponent', () => {
  let component: LoginTransferComponent;
  let fixture: ComponentFixture<LoginTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTransferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
