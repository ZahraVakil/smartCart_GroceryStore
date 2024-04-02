import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit {
  wishlist: any[] = [];

  constructor(private wishlistService: WishlistService,
    private router : Router) {}

  ngOnInit(): void {
    this.fetchWishlist();
  }

  fetchWishlist() {
    this.wishlistService.getwishlistItems().subscribe({
      
      next: (response: any) => {

        const isAuthenticated = localStorage.getItem('userId') !== null; 
        if (!isAuthenticated) {
          this.router.navigate(['/']);

          alert('Please login first.');
          return;
        }
    
        if (response && response.data && Array.isArray(response.data)) {
          this.wishlist = response.data;
          console.log(this.wishlist); // Check if products array is correctly assigned

          // Filter wishlist items based on the logged-in user's ID
          this.filterWishlistByUserId();
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  private filterWishlistByUserId(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.wishlist = this.wishlist.filter((item: any) => item.attributes.user_detail.data.id === parseInt(userId));
      console.log(this.wishlist);
    }
  }


  removeFromWhishlist(productId: number) {
    const confirmation = window.confirm('Are you sure you want to remove this item from your wishlist?');
if(confirmation){
    this.wishlistService.deleteWhislist(productId).subscribe({
      next: () => {
        // Filter out the deleted product from the wishlist array
        this.wishlist = this.wishlist.filter((item: any) => item.id !== productId);
        console.log('Product deleted from wishlist:', productId);
      },
      error: (error: any) => {
        console.error('Error deleting product from wishlist:', error);
      }
    });
  }
}

}
