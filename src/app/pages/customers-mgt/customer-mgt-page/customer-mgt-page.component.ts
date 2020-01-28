import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UniqueNumber } from 'src/app/shard/UniqueNumber';
import { ResponsObject } from 'src/app/shard/ReponsObject';

@Component({
  selector: 'app-customer-mgt-page',
  templateUrl: './customer-mgt-page.component.html',
  styleUrls: ['./customer-mgt-page.component.scss']
})
export class CustomerMgtPageComponent implements OnInit {

  customersFb:FormGroup;
  date:Date;
  customerGroup:any;
  provinceList:any;
  customerList:any;
  listOfCusGroup:any;
  constructor(private router:Router,private http:HttpClient,private fb:FormBuilder) {
    // this.getCustomerRegNumber();
   }

  ngOnInit() {

    this.customersFb =this.fb.group({
      customerSeq:[null],
      customerReqNo:[null,[Validators.maxLength(20),Validators.required]],
      nameWithInitials:[null,[Validators.maxLength(140),Validators.required]],
      fullName:[null,[Validators.maxLength(140),Validators.required]],
      address:[null,[Validators.maxLength(100),Validators.required]],
      address2:[null,[Validators.maxLength(100)]],
      email:[null,[Validators.maxLength(70),Validators.required]],
      nic:[null,[Validators.maxLength(12),Validators.required]],
      registeredDate:[null,[Validators.required]],
      mobileNo:[null,[Validators.maxLength(10),Validators.required]],
      teleNo:[null,[Validators.maxLength(10),Validators.required]],
      noOfFamilyMembers:[null,[Validators.maxLength(2),Validators.required]],
      province:[null,[Validators.maxLength(20),Validators.required]],
      status:[null,[Validators.maxLength(1),Validators.required]],
      createdBy:[null],
      updatedBy:[null],
      createdDate:[null],
      UpdatedDate:[null],
      image:[null],
      groupId:[null]



    });

    this.getCustomerRegNumber();
    this.getAllActiveCustomerGroups();

  }

  backToHome(){

    this.router.navigate(['/home-page/customer-mgt'])

  }

  backToMain(){
    this.router.navigate(['/home-page'])

  }

  // -------------------------------------------------------------

  getCustomerRegNumber() {

    this.http.get<ResponsObject>(environment.apiUrl + 'numbers/getNumberById/' + UniqueNumber.CUSTOMER).subscribe((res) => {
      this.customersFb.controls.customerReqNo.setValue(res.status);
    });

  }


  getAllActiveCustomerGroups(){

    this.http.get<ResponsObject>(environment.apiUrl + 'cus_group_mgt/getAllCustomerGroups/').subscribe((res) => {
      console.log(' xxxx---> ', res);
      this.listOfCusGroup =res;

    });

  }


}
