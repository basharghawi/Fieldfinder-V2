import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDetailedComponent } from './field-detailed.component';

describe('FieldDetailedComponent', () => {
  let component: FieldDetailedComponent;
  let fixture: ComponentFixture<FieldDetailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FieldDetailedComponent]
    });
    fixture = TestBed.createComponent(FieldDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
