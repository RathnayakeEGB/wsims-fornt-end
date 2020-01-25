import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-home-page',
  templateUrl: './customer-home-page.component.html',
  styleUrls: ['./customer-home-page.component.scss']
})
export class CustomerHomePageComponent implements OnInit {

  constructor(private router:Router ,private http:HttpClient ) { }

  ngOnInit() {
  }

  /*
      url-management----------------------------

  */
  mangeCustomers() {
    this.router.navigate(['/home-page/cutomer-management']);
  }

  mangeCustomerGroup() {
    this.router.navigate(['/home-page/cutomer-group-management']);
  }

  backToHome(){
    this.router.navigate(['/home-page']);

  }

  /*
      url-management----------------------------

  */




}
