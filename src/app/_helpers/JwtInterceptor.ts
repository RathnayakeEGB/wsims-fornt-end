import { NzNotificationService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
const exceptionList: Array<any> = ['/assets/'];

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private notification: NzNotificationService;


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        let userObject = sessionStorage.getItem('currentUser');
        if (userObject) {
            const accessToken = sessionStorage.getItem('t');

            console.log('Attaching Token :', accessToken);
            // console.log('[HttpRequest] Attaching Token...');
            if (accessToken) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + accessToken)

                });
                console.log(cloned);

                console.log('[HttpRequest] Token Attached');

                return next.handle(cloned).pipe(catchError((error, caught) => {

                    if (error.status === 401) {
                        this.notification.error(error.status, 'JWT Interceptor');

                    }
                    if (error.status === 403) {
                        this.notification.error(error.status, 'JWT Interceptor');

                    }
                    return of(error);
                }) as any);




            }
            else {

                console.log('[HttpRequest] Token Not Attached');
                return next.handle(req);
            }
        }

        console.log('call with-- :',req);

        return next.handle(req);





    }


}
