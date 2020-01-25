import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-group-page',
  templateUrl: './customer-group-page.component.html',
  styleUrls: ['./customer-group-page.component.scss']
})
export class CustomerGroupPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  backToHome() {

    this.router.navigate(['/home-page/customer-mgt'])

  }

  backToMain() {
    this.router.navigate(['/home-page'])

  }

}
