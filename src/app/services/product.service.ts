import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  productDetailsURL: string = environment.baseURL + environment.product_details;

  constructor(private http: HttpClient) {}
   

  getProducts() {
    return this.http.get(this.productDetailsURL);
  }

  getProductById(id: number) {
    const url = `${environment.baseURL}${environment.product_by_id.replace('id', id.toString())}`;
    return this.http.get(url);
  }
}
