import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-mgt-page',
  templateUrl: './customer-mgt-page.component.html',
  styleUrls: ['./customer-mgt-page.component.scss']
})
export class CustomerMgtPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  backToHome(){

    this.router.navigate(['/home-page/customer-mgt'])

  }

  backToMain(){
    this.router.navigate(['/home-page'])

  }

}
