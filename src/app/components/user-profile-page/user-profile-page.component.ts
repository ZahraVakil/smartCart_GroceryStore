import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent {
  userDetails: any = {};
  userAddresses: any = [];

  //inserting value
  constructor(private userService: UserService) {
    this.newUserDetails = {
      username: '',
      phone: '',
    };
  }

  ngOnInit() {
    //  Value get from API
    this.getUserProfile();
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

  //user update form
  newUserDetails: any = {};
  showUpdateForm = false;

  cancelUpdateProfileBtn() {
    this.showUpdateForm = false;
  }
  updateProfileBtn() {
    this.showUpdateForm = true;
    this.newUserDetails = {
      username: this.userDetails.username,
      phone: this.userDetails.phone,
    };
  }

  updateProfile() {
    console.log(this.newUserDetails);
    // let token = JSON.parse(localStorage.getItem('_token')?.toString() || '');
    // this.user.updateUserProfile(this.userDetails, token).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //   },
    //   error: (error: any) => {
    //     console.log('err');
    //     console.table(error);
    //   },
    // });
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
