import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  isDropdownOpen: boolean = false;
  authSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    // Initialize isLoggedIn using the current authentication status from localStorage
    this.isLoggedIn = this.authService.getAuthStatus();

    // Subscribe to changes in authentication status
    this.authSubscription = this.authService.authStatus.subscribe((status: boolean) => {
      this.isLoggedIn = status; // Update isLoggedIn when authentication status changes
    });
  }

  ngOnDestroy() {
    // Unsubscribe from authStatus subscription to prevent memory leaks
    this.authSubscription.unsubscribe();
  }

  onbtnClickNavigatePage(eventArgs: string) {
    this.router.navigate([`/${eventArgs}`]);
  }

  @Output() clickCart: EventEmitter<void> = new EventEmitter<void>();

  onClickCart(): void {
    this.clickCart.emit();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onProfileClick() {
    this.router.navigate(['/profile']);
  }

  onOrdersClick() {
    this.router.navigate(['/orders']);

  }

  onLogoutClick() {
    console.log('Logout clicked');
    localStorage.clear(); // Clear token on logout
    this.authService.setAuthStatus(false); // Update authentication status
    this.router.navigate(['/']);
  }
}
