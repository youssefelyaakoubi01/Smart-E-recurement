import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAffComponent } from './verify-aff.component';

describe('VerifyAffComponent', () => {
  let component: VerifyAffComponent;
  let fixture: ComponentFixture<VerifyAffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyAffComponent]
    });
    fixture = TestBed.createComponent(VerifyAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
