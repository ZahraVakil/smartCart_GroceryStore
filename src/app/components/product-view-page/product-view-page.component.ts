import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-view-page',
  templateUrl: './product-view-page.component.html',
  styleUrls: ['./product-view-page.component.css']
})
export class ProductViewPageComponent implements OnInit {

  productId: number = 0;
  product: any = {};
  quantity: number = 1; 

  constructor(private route: ActivatedRoute, private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService) { }

  ngOnInit(): void {
    // Get the product ID from the route parameter
    this.route.params.subscribe(params => {
      this.productId = +params['id'];

      // Fetch the product details based on the ID
      this.getProductById(this.productId);
    });
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.product = response.data.attributes;
        console.log(response);
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  addToWishlist(): void {
    const isAuthenticated = localStorage.getItem('userId') !== null; 
    if (!isAuthenticated) {
      alert('Please login first.');
      return;
    }

const wishlistItemPayload = {
  data: {
    product: this.productId,
    user_detail: localStorage.getItem('userId')
  }
};


    this.wishlistService.addWishlist(wishlistItemPayload).subscribe(
      () => {
        // console.log('Cart Item:', cartItem);

        // Successfully added to cart, update local storage or UI as needed
        alert('Product added to Favourite successfully!');
      },
      error => {
        console.error('Error adding product to cart:', error);
        // Handle error as needed
      }
    );
  }


  addToCart( quantity: number): void {
    //check user login or not
    const isAuthenticated = localStorage.getItem('userId') !== null; 
    if (!isAuthenticated) {
      alert('Please login first.');
      return;
    }
console.log(this.productId);

const cartItemPayload = {
  data: {
    product: this.productId,
    quantity: quantity,
    user_detail: localStorage.getItem('userId')
  }
};


    this.cartService.addCart(cartItemPayload).subscribe(
      () => {
        // console.log('Cart Item:', cartItem);

        // Successfully added to cart, update local storage or UI as needed
        alert('Product added to cart successfully!');
      },
      error => {
        console.error('Error adding product to cart:', error);
        // Handle error as needed
      }
    );
  }
  goBack() {
    this.router.navigate(['/']); // Replace '/' with your actual home route
  }
}
