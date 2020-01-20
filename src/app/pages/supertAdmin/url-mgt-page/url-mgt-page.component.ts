import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-url-mgt-page',
  templateUrl: './url-mgt-page.component.html',
  styleUrls: ['./url-mgt-page.component.scss']
})
export class UrlMgtPageComponent implements OnInit {

  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedValue: string[] = [];
  isLoading = false;
  // tslint:disable-next-line: max-line-length
  urlLevels =[{"LevelCode":1,"description":"Level One Url : 1"},{"LevelCode":2,"description":"Level Two Url : 2"},{"LevelCode": 3,"description":"Level One Url : 3"}]
  urlMgt: FormGroup;

  Mainmenus = [];
  subList= [];

  constructor(private fb: FormBuilder,private http:HttpClient) {
    this.createForm();
    this.urlMgt.controls.subLink.disable();
    this.urlMgt.controls.mainLink.disable();

  }

  ngOnInit() {




  }

  UrlLevelChange(levl:any){

    if(levl===1){

      this.urlMgt.controls.subLink.disable();
      this.urlMgt.controls.mainLink.disable();
    }else if(levl===2){
      this.getMainMenus();
      this.urlMgt.controls.subLink.disable();
      this.urlMgt.controls.mainLink.enable();
    }else{
      this.urlMgt.controls.subLink.enable();
      this.urlMgt.controls.mainLink.enable();
    }



  }

  createForm(){

    this.urlMgt = this.fb.group({
      level: [null, [Validators.required]],
      icon: [null],
      icoLocation: [null ],
      title: [null, [Validators.required]],
      mainLink: [null ],
      routerLink: [null, [Validators.required]],
      subLink: [null,],
      open:[null],
      disabled:[null],
      selected:[null]

    });

  }

  getMainMenus(){

    this.http.get<[]>(environment.apiUrl + 'menu/getAllMenuItems').subscribe((res)=>{
      console.log(res);
      this.Mainmenus = res;
   });

  }

  createNewLink(){

    for (const i in this.urlMgt.controls) {

      this.urlMgt.controls[i].markAsDirty();
      this.urlMgt.controls[i].updateValueAndValidity();
    }


    // stop here if form is invalid
    if (this.urlMgt.invalid) {
        return;
    }


    let m = this.urlMgt.value;

    if(this.urlMgt.controls.level.value === 2){
      m.perentId= this.urlMgt.controls.mainLink.value;
    }

    if(this.urlMgt.controls.level.value=== 3){
      m.perentId= this.urlMgt.controls.subLink.value;
    }

    console.log(this.urlMgt.value);


    this.http.post<any>(`${environment.apiUrl}menu/createMenuItems`,m).subscribe((res)=>{
      console.log(res);
      this.Mainmenus = res;

   });


  }

}
