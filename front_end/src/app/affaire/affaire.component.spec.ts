import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireComponent } from './affaire.component';

describe('AffaireComponent', () => {
  let component: AffaireComponent;
  let fixture: ComponentFixture<AffaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffaireComponent]
    });
    fixture = TestBed.createComponent(AffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
