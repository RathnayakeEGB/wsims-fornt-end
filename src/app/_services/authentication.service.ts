import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    loadingMsg: any;
    constructor(
        private message: NzMessageService,
        private router: Router,
        private notification: NzNotificationService,
        private http: HttpClient,

    ) { }

    authenticateLogin(username,password) {
        // this.loadingMsg = this.message.loading('Authenticating...', { nzDuration: 0 }).messageId;

        console.log(`user Name : ${username} === Password  : ${password}`);


        // make http request here
        return this.http.post<User>(environment.apiUrl + 'api/auth/signin', {username,password})
            .pipe(map(data => {
                console.log(data);



                if (data && data.token) {
                    console.log('CLEARING CURRENT SESSION');
                    // sessionStorage.clear();

                    console.log('SETTING NEW SESSION...');
                    sessionStorage.setItem('t', data.token);
                    sessionStorage.setItem('currentUser', data.username);
                    // sessionStorage.setItem('orgName', data.userInfor.givenName)

                    // sessionStorage.setItem('currentUser', JSON.stringify(data));
                    // sessionStorage.setItem('currentUserRoles', JSON.stringify(data['functionList']));
                    // sessionStorage.setItem('currentUserFunctions', JSON.stringify(data['userFunctions']));
                    // sessionStorage.setItem('currentUserSubFunctions', JSON.stringify(data['subFunctionList']));
                    // sessionStorage.setItem('currentUserId', data['userInfor.email']);

                    /*   if (JSON.stringify(data['shopSequence'])) {
                          sessionStorage.setItem('currentUserShopSeq', data['shopSequence']);
                      } */

                    this.router.navigate(['home-page']);
                    // this.message.remove(this.loadingMsg);
                } else {
                    console.log('AUTHENTICATION FAILED');
                    // this.message.remove(this.loadingMsg);
                    this.message.create('error', 'Login Failed!');
                }
                console.log('AUTHENTICATION STOPPED RUNNING...');
                return data;
            }));
    }


    authenticateOTP(otp: string) {
        if (otp == '123') {
            console.log(sessionStorage.getItem('firstLogin'));

            if (sessionStorage.getItem('firstLogin') == "Y") {
                this.notification.create(
                    'info',
                    'Welcome New User',
                    'Since this is your first login please change your password to proceed. This will remove the system generated password.', { nzDuration: 20000 }
                );
                this.router.navigate(['change-password']);

            } else {
                this.router.navigate(['home']);
                this.notification.create(
                    'success',
                    'Welcome',
                    'Some user msg here....', { nzDuration: 10000 }
                );
            }

        } else {
            this.message.create('error', 'Invalid OTP!');

        }


    }
    logoutAndClearSession() {
        sessionStorage.clear();
        this.router.navigate([`login`]);

    }
}
