import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProductViewPageComponent } from './components/product-view-page/product-view-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { WishlistPageComponent } from './components/wishlist-page/wishlist-page.component';
import { UserProfilePageComponent } from './components/user-profile-page/user-profile-page.component';
import { OrderSummaryPageComponent } from './components/order-summary-page/order-summary-page.component'; 
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { OrderHistoryPageComponent } from './components/order-history-page/order-history-page.component';
import { InterceptorInterceptor } from './services/interceptors/interceptor.interceptor';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginPageComponent,
    SignupPageComponent,
    PageNotFoundComponent,
    LandingPageComponent,
    ProductViewPageComponent,
    CartPageComponent,
    WishlistPageComponent,
    UserProfilePageComponent,
    OrderSummaryPageComponent,
    OrderHistoryPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    DropdownModule,
    MenubarModule,
    HttpClientModule

  ],
  providers: [MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
