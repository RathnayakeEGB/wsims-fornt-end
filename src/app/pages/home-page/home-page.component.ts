import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isCollapsed=true;

  constructor(private http: HttpClient) {
    this.getAllMenueItems();
   }

  ngOnInit() {
  }

  mode = false;
  dark = false;

  menus = [];

  getAllMenueItems(){

    this.http.get<[]>(environment.apiUrl + 'menu/getAllMenuItems').subscribe((res)=>{
      console.log(res);
      this.menus=res;
   });
  }

}
