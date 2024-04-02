import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartItems: any[] = [];

  constructor(private router: Router, private cartService: CartService) {
    }
  @Output() closeSidebar: EventEmitter<void> = new EventEmitter<void>();

  onCloseSidebar() {
    this.closeSidebar.emit();
  }

  onCheckout(): void {
    this.router.navigate(['/checkout']);
    this.onCloseSidebar();  
  }

  onContinueShopping(): void {
    this.router.navigate(['/']);
    this.onCloseSidebar(); // Close the sidebar after navigation
  }



  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const userIdNumber = +userId;

      this.cartService.getCartItemsByUserId(userIdNumber).subscribe(
        (response: any) => {
          console.log(response);
          this.cartItems = response.data; // Assuming the response contains cart items
        },
        error => {
          console.error('Error fetching cart items:', error);
        }
      );
    }
  }

 // Inside your component class
getSubtotal(): number {
  let subtotal = 0;

  // Iterate over each item in the cartItems array
  for (const item of this.cartItems) {
    // Extract the numeric value from the formatted price (remove the currency symbol)
    const priceNumeric = parseFloat(item.attributes.product.data.attributes.price);
    // Multiply the quantity by the numeric price and add it to the subtotal
    subtotal += item.attributes.quantity * priceNumeric;
  }

  // Return the calculated subtotal
  return subtotal;
}


removeFromCart(productId: number) {
  const confirmation = window.confirm('Are you sure you want to remove this item from your wishlist?');
if(confirmation){
  this.cartService.deleteCart(productId).subscribe({
    next: () => {
      // Filter out the deleted product from the wishlist array
      this.cartItems = this.cartItems.filter((item: any) => item.id !== productId);
      console.log('Product deleted from wishlist:', productId);
    },
    error: (error: any) => {
      console.error('Error deleting product from wishlist:', error);
    }
  });
}
}


  
}
