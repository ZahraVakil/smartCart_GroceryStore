import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myprj';

  isCartOpen: boolean = false;

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  onCloseSidebar(): void {
    this.isCartOpen = false;
  }
}
