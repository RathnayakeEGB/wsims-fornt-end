import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/log-in-mgt/login-page/login-page.component';
import { AuthGuard } from './_helpers/AuthGuard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UrlMgtPageComponent } from './pages/supertAdmin/url-mgt-page/url-mgt-page.component';
import { UserHomePageComponent } from './pages/user-mgt/user-home-page/user-home-page.component';
import { UserMgtPageComponent } from './pages/user-mgt/user-mgt-page/user-mgt-page.component';
import { UserGroupPageComponent } from './pages/user-mgt/user-group-page/user-group-page.component';
import { CustomerHomePageComponent } from './pages/customers-mgt/customer-home-page/customer-home-page.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'home-page', component: HomePageComponent,canActivate: [AuthGuard],
    children:[
      {path:"super-admin-url-manager",component:UrlMgtPageComponent},
      {path: 'user-mgt', redirectTo: 'user-home' ,pathMatch:'full'},
      { path: 'user-home', component: UserHomePageComponent },
      { path: 'user-manage', component: UserMgtPageComponent, pathMatch: 'prefix'},
      { path: 'user-group-mgt', component: UserGroupPageComponent },
      {path:'customer-mgt',redirectTo: 'cutomer-home',pathMatch:'full'},
      { path: 'cutomer-home', component: CustomerHomePageComponent },




    ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
