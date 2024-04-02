import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartURL: string = environment.baseURL + environment.product_to_cart;

  constructor(private http: HttpClient) {}

  addCart(cartProduct: any): Observable<any> {
    return this.http.post(this.cartURL, cartProduct);
  }

  getCartItemsByUserId(userId: number): Observable<any> {
    let url = `http://localhost:1337/api/carts?filters[user_detail][id][$eq][0]=${userId}&populate=product&filters[order][id][$notNull]`;

    // Make GET request to fetch cart items for the specified user ID
    return this.http.get(url);
  }

  deleteCart(id: number) {
    const url = `${environment.baseURL}${environment.delete_cart.replace('id', id.toString())}`;
    return this.http.delete(url);
  }

}
