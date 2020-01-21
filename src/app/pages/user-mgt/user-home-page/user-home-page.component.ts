import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss']
})
export class UserHomePageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  createUserGroup(){
    this.router.navigate(['/home-page/user-group-mgt']);
  }


}
