import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetailsURL: string = environment.baseURL + environment.user_details;
  updateUser: string = environment.baseURL + environment.update_user;
  updateAddress: string = environment.baseURL + environment.update_address

  constructor(private http: HttpClient) {}
   

  getUserdetails() {
    return this.http.get(this.userDetailsURL);
  }

 
  // updateUserProfile(token: string, data: { username: string; phone: string }) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   });

  //   return this.http.put<any>(updateUrl, data, { headers });
  // }


  updateUserDetails(userId: any, newData: any) {
    const url = `${this.updateUser}/${userId}`;
    console.log(url);
    return this.http.put<any>(url, newData);
  }


  addNewAddress(addressData: any) {
    
    return this.http.post(this.updateAddress, { data: addressData });
  }
}

