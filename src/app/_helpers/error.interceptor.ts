import { NzNotificationService } from 'ng-zorro-antd';
import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { tap } from "rxjs/operators";
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private notification: NzNotificationService

    ) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        // this.spinner.show()

        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if (evt.body && evt.body.success)
                        console.log('Success Response Received');

                    // this.spinner.hide()

                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    try {
                        // this.spinner.hide()

                        console.log('[Error Interceptor] Error Status :', err.status);
                        this.notification.error('' + err.status, '[Error Interceptor]');

                        console.log(err);

                        if (err.status == 401) {
                            console.log('Redirect to Login');
                            this.router.navigate([`login`]);
                        }
                    } catch (e) {
                        console.log(e);
                        this.router.navigate([`login`]);
                    }
                    //log error
                }
                return of(err);
            }));

    }



}
