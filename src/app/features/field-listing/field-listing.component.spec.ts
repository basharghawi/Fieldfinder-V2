import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldListingComponent } from './field-listing.component';

describe('FieldListingComponent', () => {
  let component: FieldListingComponent;
  let fixture: ComponentFixture<FieldListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FieldListingComponent]
    });
    fixture = TestBed.createComponent(FieldListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
