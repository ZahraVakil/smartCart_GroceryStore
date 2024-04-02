import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent {
  userDetails: any = {};
  userAddresses: any = [];

  userContentFormGroupUser!: FormGroup;
  userContentFormGroupAddress!: FormGroup;

  isSubmitted: boolean = false;

  addressFrom: any = {
    line1: '',
    line2: '',
    landmark: '',
    city: '',
  };

  
  states: any[] = [];
  cities: any[] = [];
  


  //inserting value
  constructor(private userService: UserService, private addressService: AddressService,
        private formBuilder: FormBuilder, 
    ) {
    this.newUserDetails = {
      username: '',
      phone: '',
    };
  }

  ngOnInit() {
    //  Value get from API
    this.getUserProfile();
    this.fetchStates();

    this.userContentFormGroupUser = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
     
    });
    

    this.userContentFormGroupAddress = this.formBuilder.group({
      addressLine1: ['', [Validators.required, Validators.minLength(5)]],
      addressLine2: [''],

      landmark: ['', [Validators.required, Validators.minLength(5)]],
      cityId: ['', Validators.required], 
      stateId: ['', Validators.required], // Define stateId control here


    });
    }


  get formControls() {
    return this.userContentFormGroupUser.controls;

  }

  get formControlsAdd(){
    return this.userContentFormGroupAddress.controls;

  }


  //Function for APi Call

  getUserProfile() {

    this.userService.getUserdetails().subscribe({
      next: (response: any) =>  {
        this.userDetails = response;
        this.userAddresses = response.user_addresses;
        this.newUserDetails.username = response.username;
        this.newUserDetails.phone = response.phone;
      },
      error: (error: any) => {
        // this.isLoggedIn = false;
        console.log('err');
        console.table(error);
      },
    });
  }


  //delete Addresss 


  removeAddress(addressId: number) {
    const confirmation = window.confirm('Are you sure you want to remove this item from your wishlist?');
  if(confirmation){
    this.addressService.deleteAddress(addressId).subscribe({
      next: () => {
        // Filter out the deleted product from the wishlist array
        this.userAddresses = this.userAddresses.filter((item: any) => item.id !== addressId);
        console.log('Product deleted from wishlist:', addressId);
      },
      error: (error: any) => {
        console.error('Error deleting product from wishlist:', error);
      }
    });
  }
  }
  


  fetchStates(): void {
    this.addressService.getAllStates().subscribe({
      next: (response: any) => {
        this.states = response.data;
      },
      error: (error) => {
        console.error('Error fetching states:', error);
      }
    });
  }
  
  fetchCitiesByState(stateId: number): void {
    this.addressService.getCityById(stateId).subscribe({
      next: (response: any) => {
        this.cities = response.data;
      },
      error: (error) => {
        console.error('Error fetching cities:', error);
      }
    });
  }
  

  onStateChange(): void {
    const stateId = this.userContentFormGroupAddress.get('stateId')?.value;
    if (stateId) {
      this.fetchCitiesByState(stateId);
    }
  }

  //user update form
  newUserDetails: any = {};
  showUpdateForm = false;

  cancelUpdateProfileBtn() {
    this.showUpdateForm = false;
  }
  updateProfileBtn() {
    this.showUpdateForm = true;
     }


  updateProfile() {
    this.isSubmitted = true;


    console.log("update called")


    if (this.userContentFormGroupUser.invalid) {

      console.log("update called invalid")

      return;

    }



    this.newUserDetails = {
      username: this.userContentFormGroupUser.get('username')?.value,
      mobile_number: this.userContentFormGroupUser.get('mobile')?.value,
    };
 
  

    let id = JSON.parse(localStorage.getItem('userId') || 'null') || '';

    this.userService.updateUserDetails(id, this.newUserDetails).subscribe({
      next: (response) => {
        console.log('User details updated successfully:', response);
        this.cancelUpdateProfileBtn();
        this.getUserProfile()
      },
      error: (error) => {
        console.error('Error updating user details:', error);
      },
    });
  }



  addressFormSubmit() {

    console.log('called addresss');

    if (this.userContentFormGroupAddress.invalid) {
      return;
    }


    console.log('called addresss');

    let id = JSON.parse(localStorage.getItem('userId') || '');
    console.log('for id :', id);

    const addressData = {
      user_details: id, // Replace with actual user details
      address_line_1: this.userContentFormGroupAddress.get('addressLine1')?.value,
      address_line_2: this.userContentFormGroupAddress.get('addressLine2')?.value,
      landmark: this.userContentFormGroupAddress.get('landmark')?.value,
      isDefault: false, // Set to true if it's the default address
      city: 1, // Replace with actual city details
    };

    this.userService.addNewAddress(addressData).subscribe({
      next: (response: any) => {
        alert('Address added successfully');
        this.userContentFormGroupAddress.reset();

        this.showAddressForm = false;

        this.getUserProfile();
      },
      error: (error: any) => {
        console.error('Error adding address:', error);
        alert('Error adding address');
      },
    });
  }



  //address form
  showAddressForm = false;

  showAddressFormBtn() {
    this.showAddressForm = true;
  }
  cancelAddressFormBtn() {
    this.showAddressForm = false;
  }
}
