import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ResponsObject } from 'src/app/shard/ReponsObject';
import { UniqueNumber } from 'src/app/shard/UniqueNumber';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-customer-group-page',
  templateUrl: './customer-group-page.component.html',
  styleUrls: ['./customer-group-page.component.scss']
})
export class CustomerGroupPageComponent implements OnInit {

  customerGroupFb : FormGroup;
  saveButtonText = 'Save';
  getAllCusGroup = [];

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private notification: NzNotificationService) { }

  ngOnInit() {

    this.customerGroupFb = this.fb.group({
      customerGroupSeq: [null],
      customerGroupNo: [null, [Validators.required, Validators.maxLength(20)]],
      customerGroupName: [null, [Validators.required, Validators.maxLength(30)]],
      description: [null, [Validators.required, Validators.maxLength(100)]],
      isActive: [null, [Validators.required, Validators.maxLength(1)]],
      createdBy: [null]

    });
    this.loadGroupNo();
    this.saveButtonText = 'Save';
    this.getAllCustomerGroups();
  }

  backToHome() {
    this.router.navigate(['/home-page/customer-mgt'])
  }

  backToMain() {
    this.router.navigate(['/home-page'])
  }


  private loadGroupNo(){


    this.http.get<ResponsObject>(environment.apiUrl + 'numbers/getNumberById/' + UniqueNumber.CUSTOMERGROUP).subscribe((res) => {
      console.log(' xxxx---> ', res);
      this.customerGroupFb.controls.customerGroupNo.setValue(res.status);
   });

  }


  private createNewCustomerGroup(){

    this.customerGroupFb.controls.createdBy.setValue(sessionStorage.getItem('currentUser'));

    if (this.saveButtonText === 'Save'){

      // tslint:disable-next-line: max-line-length
      this.http.post<ResponsObject>(`${environment.apiUrl}cus_group_mgt/createNewCustomerGroup`, this.customerGroupFb.value).subscribe((res) => {
        console.log(res);

        if ( res.statusCode === 400) {

          this.notification.create('error', '*** New Customer Group ***', res.status);

        } else if ( res.statusCode === 500) {

          this.notification.create('error', '*** New Customer Group ***', res.status);

        } else if ( res.statusCode === 200) {
          this.notification.create('success', '*** New Customer Group ***', 'Sucessfully Created New Customer Group !');
          this.clear();
        }

     });

    } else {

      this.customerGroupFb.controls.createdBy.setValue(sessionStorage.getItem('currentUser'));

      // tslint:disable-next-line: max-line-length
      this.http.put<ResponsObject>(`${environment.apiUrl}cus_group_mgt/updateCustomerGroupInfo`, this.customerGroupFb.value).subscribe((res) => {
          console.log(res);

          if ( res.statusCode === 400) {

            this.notification.create('error', '*** New Customer Group ***', res.status);

          } else if ( res.statusCode === 500) {

            this.notification.create('error', '*** New Customer Group ***', res.status);

          } else if ( res.statusCode === 200) {
            this.notification.create('success', '*** New Customer Group ***', 'Sucessfully Updated  Customer Group !');
            this.clear();
          }

      });


    }



  }

  clear(){
    this.customerGroupFb.reset();
    this.loadGroupNo();
    this. getAllCustomerGroups();
    this.saveButtonText = 'Save';

  }

  getAllCustomerGroups(){

    this.http.get<any>(environment.apiUrl + 'cus_group_mgt/getAllCustomerGroups').subscribe((res) => {
      console.log(' xxxx---> ', res);
      this.getAllCusGroup = res;

   });

  }

  getRowData(data: any){

    this.saveButtonText = 'Update';
    console.log(data);

    this.customerGroupFb.controls.customerGroupNo.setValue(data.customerGroupNo);
    this.customerGroupFb.controls.customerGroupName.setValue(data.customerGroupName);
    this.customerGroupFb.controls.description.setValue(data.description);
    this.customerGroupFb.controls.isActive.setValue(data.isActive);


  }

}
