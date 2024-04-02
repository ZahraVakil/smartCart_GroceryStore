import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('userId') !== null;
    if (!isAuthenticated) {
      this.router.navigate(['/']);
      alert('Please login first.');
      return false;
    }
    return true;
  }
}
