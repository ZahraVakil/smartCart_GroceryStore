import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryPageComponent } from './order-summary-page.component';

describe('OrderSummaryPageComponent', () => {
  let component: OrderSummaryPageComponent;
  let fixture: ComponentFixture<OrderSummaryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSummaryPageComponent]
    });
    fixture = TestBed.createComponent(OrderSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
