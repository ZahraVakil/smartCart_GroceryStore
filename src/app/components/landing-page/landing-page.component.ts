import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  products: any[] = [];

  constructor(private router: Router, private productService: ProductService) {
  }


  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        // Check if response contains the "data" field and it's an array
        if (response && response.data && Array.isArray(response.data)) {
          // Assign the products array to this.products
          this.products = response.data;
          console.log(this.products); // Check if products array is correctly assigned
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  
     
        

  viewProduct(productId: number) {
    // Navigate to product view component with product ID parameter
    this.router.navigate(['/product', productId]);
  }

 
}
