import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartItems: any[] = [];

  constructor(private router: Router) {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }
  @Output() closeSidebar: EventEmitter<void> = new EventEmitter<void>();

  onCloseSidebar() {
    this.closeSidebar.emit();
  }

  onCheckout(): void {
    // Navigate to the checkout page
    this.router.navigate(['/checkout']);
    this.onCloseSidebar(); // Close the sidebar 
  }

  onContinueShopping(): void {
    // Navigate to the home page
    this.router.navigate(['/']);
    this.onCloseSidebar(); // Close the sidebar after navigation
  }

  removeFromCart(item: any): void {
    // Ask for confirmation before removing the item
    const confirmed = confirm(`Are you sure you want to remove ${item.name} from your cart?`);
    
    if (confirmed) {
      // Remove item from cartItems array
      this.cartItems = this.cartItems.filter(i => i !== item);
      // Update localStorage with the new cartItems array
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
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
