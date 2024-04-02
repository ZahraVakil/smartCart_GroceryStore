import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

 placeOrderURL = environment.baseURL + environment.place_order;
 getOrderURL = environment.baseURL + environment.get_orders;

  constructor(private http: HttpClient) {}

  placeOrder(orderData: any) {
    return this.http.post<any>(this.placeOrderURL, orderData)
      
  }

  getOrders(): any {
    return this.http.get<any>(this.getOrderURL);
  }

}
