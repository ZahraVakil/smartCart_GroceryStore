import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent {
  wishlist: any[] = [];

  constructor() {
    // Initialize wishlist from local storage
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');;
  }

  removeFromWishlist(product: any): void {
    // Confirm before removing the product from wishlist
    if (confirm('Are you sure you want to remove this item from your wishlist?')) {
      // Remove the product from the wishlist
      this.wishlist = this.wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      alert('Product removed from wishlist successfully!');
    }
  }

  addToCart(product: any): void {
    // Implement adding product to cart logic here
    alert('Product added to cart successfully!');
  }

}
