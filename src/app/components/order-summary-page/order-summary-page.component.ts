import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary-page',
  templateUrl: './order-summary-page.component.html',
  styleUrls: ['./order-summary-page.component.css']
})
export class OrderSummaryPageComponent implements OnInit {
  cartItems: any[] = [];

  ngOnInit(): void {
    // Retrieve cart items from local storage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      // Extract the numeric value from the formatted price (remove the currency symbol)
      const mrpNumeric = parseFloat(item.product.mrp.replace(/[^\d.]/g, ''));
      // Multiply the quantity by the numeric price and add it to the total
      return total + (item.quantity * mrpNumeric);
    }, 0);
  }
  
}