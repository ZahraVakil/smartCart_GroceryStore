import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  getAddressURL = environment.baseURL + environment.get_address;
  getStatesURL = environment.baseURL + environment.get_states;
  getCitiesURL = environment.baseURL + environment.get_cities_byStates;

  constructor(private http: HttpClient) { }


  getAddresses()
  {
    return this.http.get(this.getAddressURL);
  }

  deleteAddress(id: number) {
    const url = `${environment.baseURL}${environment.delete_address.replace('id', id.toString())}`;
    return this.http.delete(url);
  }


  getAllStates() {
    return this.http.get<any>(this.getStatesURL);
  }

  getCityById(stateId: any) {
    return this.http.get<any>(this.getCitiesURL + stateId);
  }

}
