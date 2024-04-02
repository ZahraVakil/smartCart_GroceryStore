import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-placed-page',
  templateUrl: './order-placed-page.component.html',
  styleUrls: ['./order-placed-page.component.css']
})
export class OrderPlacedPageComponent {


  constructor(private router: Router){

  }

  viewOrders(){
    this.router.navigate(['/orderHistory']);
  }

  continueShopping(){
    this.router.navigate(['/']);
  }


}
