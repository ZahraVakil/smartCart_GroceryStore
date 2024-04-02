import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AddressService } from 'src/app/services/address.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order-summary-page',
  templateUrl: './order-summary-page.component.html',
  styleUrls: ['./order-summary-page.component.css']
})
export class OrderSummaryPageComponent implements OnInit {
  cartItems: any[] = [];
  addresses : any[] = [];
  shippingCost: number = 50;
  taxRate: number = 0.18;
  userContentFormGroupAddress!: FormGroup;

  isSubmitted: boolean = false;




  constructor(private router: Router, private cartService: CartService, 
    private addressService: AddressService, private formBuilder: FormBuilder,
    private orderService: OrderService
    ) {


  }

  ngOnInit(): void {
 this.fetchCartItems();
 this.fetchAddresses();

 this.userContentFormGroupAddress = this.formBuilder.group({
  address: ['', [Validators.required]],
  
});
  }

  get formControlsAdd(){
    return this.userContentFormGroupAddress.controls;

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

  calculateTotal(): number {
    let subtotal = this.getSubtotal();
    let total = subtotal + this.shippingCost;
    let taxAmount = total * this.taxRate;
    total += taxAmount;
    return total;
  }



  fetchAddresses(): void {
    // Fetch addresses from the address service
    this.addressService.getAddresses().subscribe({
      next: (response: any) => {
        console.log(response);
        // Assuming the response contains an array of addresses
        this.addresses = response.data;
      },
      error: (error: any) => {
        console.error('Error fetching addresses:', error);
      }
    });


    


  }

  getAddressString(address: any): string {
    // Concatenate the address fields you need
    return `${address.attributes.address_line_1}, ${address.attributes.address_line_2}, ${address.attributes.landmark}`;
  }

  // cartItems: any[] = [];
  order_items: string = '';
  carts: number[] = [];


  calculateOrderItemsAndCarts() {
    this.order_items = JSON.stringify(
      this.cartItems.map((item) => {
        return {
          name: item.attributes.product.data.attributes.product_name,
          quantity: item.attributes.quantity,
          price: item.attributes.product.data.attributes.price,
        };
      })
    );
    console.log(this.order_items);
    this.carts = this.cartItems.map((item) => item.id);
  }

  placeOrder() {

    this.isSubmitted = true;
    

    if (this.userContentFormGroupAddress.invalid) {

      console.log("update called invalid")

      return;

    }


    let userId = localStorage.getItem('userId');
    const orderDate = new Date().toISOString();
    this.calculateOrderItemsAndCarts();
    this.calculateTotal();
    const subtotal = this.getSubtotal();
    const taxAmount = subtotal * this.taxRate;
    const payableAmount = this.calculateTotal();

    const orderData = {
      data: {
        order_status: 'Placed,',
        order_date: orderDate,
        tax_amount: taxAmount,
        total_amount: subtotal,
        payable_amount: payableAmount,
        carts: this.carts,
        order_items: this.order_items,
        user_detail: userId,
      },
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        alert('Order placed successfully');
        this.router.navigate(['/orderPlaced']);
      },
      error: (error) => {
        console.error('Error placing order:', error);
      },
    });
  }

}

   
