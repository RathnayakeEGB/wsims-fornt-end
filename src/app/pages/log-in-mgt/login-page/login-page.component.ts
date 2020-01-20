import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


   // tslint:disable-next-line: max-line-length
   constructor(private message: NzMessageService,private route: ActivatedRoute,private fb: FormBuilder , private router: Router,private authenticationService: AuthenticationService) { }


  ngOnInit() {

    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get f() { return this.validateForm.controls; }


  submitForm() {

    console.log('XXXX');

    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {

      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }



    this.submitted = true;

    // stop here if form is invalid
    if (this.validateForm.invalid) {
        console.log('calling..............');
        return;
    }


    this.loading = true;
    console.log('calling.............. 2');

    this.authenticationService.authenticateLogin(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/home-page']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });

}


}
