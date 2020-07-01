import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbRatingModule,
  NgbDropdownModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { environment } from '../environments/environment';
import { AuthGuard } from './shared/auth.guard';
import { NavService } from './shared/nav.service';
import { UserService } from './shared/user.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { routes } from './app.routes';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AddNewComponent } from './add-new/add-new.component';

import { GroupByPipe } from './orders/groupby.pipe';
import { EllipsisPipe } from './home/ellipsis.pipe';
import { RegisterationComponent } from './registeration/registeration.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    ProfileComponent,
    GroupByPipe,
    EllipsisPipe,
    LoginComponent,
    AddNewComponent,
    RegisterationComponent,
    FooterComponent,
    AboutComponent,
    HelpComponent,
    ContactUsComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ArtsCrafts' }),
    HttpClientModule,
    TransferHttpCacheModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientJsonpModule,
    NgbRatingModule,
    NgbDropdownModule,
    NgbModalModule,
    NgxPaginationModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    AuthGuard,
    NavService,
    UserService,
    Title
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}

export function getBaseUrl() {
  return environment.API_URL;
}
