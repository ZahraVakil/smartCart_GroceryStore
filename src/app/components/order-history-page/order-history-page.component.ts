import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.css']
})
export class OrderHistoryPageComponent {

  orderItems: any = [];


  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (response: { data: any }) => {
        this.orderItems = response.data;
        console.log(this.orderItems);
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
