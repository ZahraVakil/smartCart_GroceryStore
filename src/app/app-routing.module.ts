import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { ProductViewPageComponent } from './components/product-view-page/product-view-page.component';
import { WishlistPageComponent } from './components/wishlist-page/wishlist-page.component';
import { OrderSummaryPageComponent } from './components/order-summary-page/order-summary-page.component';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { OrderHistoryPageComponent } from './components/order-history-page/order-history-page.component';
import { AuthGuard } from './services/guard/auth.guard';
import { OrderPlacedPageComponent } from './components/order-placed-page/order-placed-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
 
  {
    path: 'product/:id',
    component: ProductViewPageComponent,
  },
  {
    path: 'wishlist',
    component: WishlistPageComponent,
    canActivate: [AuthGuard] 
  },
 
  {
    path: 'checkout',
    component: OrderSummaryPageComponent,
  },
 
  {
    path: 'profile',
    component: UserProfilePageComponent,
  },

  {
    path: 'orders',
    component: OrderHistoryPageComponent,
  },
 
  {
    path: 'orderPlaced',
    component: OrderPlacedPageComponent,
  },
 

  {
    path: 'orderHistory',
    component: OrderHistoryPageComponent,
  },
 
  {
    path: '**',
    component: PageNotFoundComponent,
  },
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
