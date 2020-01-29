import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_CONFIG } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, HashLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginPageComponent } from './pages/log-in-mgt/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UrlMgtPageComponent } from './pages/supertAdmin/url-mgt-page/url-mgt-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {AtomSpinnerModule} from 'angular-epic-spinners'
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/JwtInterceptor';
import { AuthGuard } from './_helpers/AuthGuard';
import { RouteReuseStrategy } from '@angular/router';
import { UserHomePageComponent } from './pages/user-mgt/user-home-page/user-home-page.component';
import { UserGroupPageComponent } from './pages/user-mgt/user-group-page/user-group-page.component';
import { UserMgtPageComponent } from './pages/user-mgt/user-mgt-page/user-mgt-page.component';
import { CustomerGroupPageComponent } from './pages/customers-mgt/customer-group-page/customer-group-page.component';
import { CustomerHomePageComponent } from './pages/customers-mgt/customer-home-page/customer-home-page.component';
import { CustomerMgtPageComponent } from './pages/customers-mgt/customer-mgt-page/customer-mgt-page.component';
import { OnlynumberDirective } from './shard/NumericDirective';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    UrlMgtPageComponent,
    UserHomePageComponent,
    UserGroupPageComponent,
    UserMgtPageComponent,
    CustomerGroupPageComponent,
    CustomerHomePageComponent,
    CustomerMgtPageComponent,
    OnlynumberDirective


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AtomSpinnerModule



  ],
  providers: [
    // { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
