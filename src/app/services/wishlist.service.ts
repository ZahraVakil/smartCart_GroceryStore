import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  wishlistURL: string = environment.baseURL + environment.product_to_wishlist;
  whislistItemsUrl : string = environment.baseURL + environment.wishlist_items;
  constructor(private http: HttpClient) {}

  addWishlist(cartProduct: any) {
    return this.http.post(this.wishlistURL, cartProduct);
  }


  getwishlistItems(){
    return this.http.get(this.whislistItemsUrl);
   }

   deleteWhislist(id: number) {
    const url = `${environment.baseURL}${environment.delete_whislist.replace('id', id.toString())}`;
    return this.http.delete(url);
  }
}
