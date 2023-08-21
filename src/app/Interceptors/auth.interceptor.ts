import { UserService } from 'src/app/services/user-service.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private usersv: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/auth/signin')) {
      return next.handle(request);
    }

    const token: string = this.usersv.getToken();

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next
      .handle(modifiedRequest)
      .pipe(tap(() => console.log('tap intercepter, ', modifiedRequest)));
  }
}
