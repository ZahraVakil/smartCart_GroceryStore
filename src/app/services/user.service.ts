import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetailsURL: string = environment.baseURL + environment.user_details;

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
}

