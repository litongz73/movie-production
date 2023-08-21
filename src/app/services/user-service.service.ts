import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject$ = new BehaviorSubject<User>({ email: '' });
  user$ = this.userSubject$.asObservable();
  private token: string = '';
  private url = 'http://127.0.0.1:4231/auth/userupdate';
  private loginUrl = 'http://127.0.0.1:4231/auth/signin';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      // console.log('on init, token', token);
      const rawInfo: any = jwt_decode(token);

      const user: User = {
        username: rawInfo.username,
        email: rawInfo.email,
        tmdb_key: rawInfo.tmdb_key,
        role: role,
      };

      // console.log('raw info', rawInfo);
      this.update(user);
      // const user: User = {
      //   email: rawInfo.email,
      //   username: rawInfo.username,
      //   role: ,
      //   tmdb_key: rawInfo.tmdb_key,
      // };
    }
  }

  login(userInput: User): any {
    return this.http.post(this.loginUrl, userInput).pipe(
      tap((res: any) => {
        const rawInfo: any = jwt_decode(res.accessToken);

        const user: User = {
          email: rawInfo.email,
          username: rawInfo.username,
          password: userInput.password,
          role: res.role,
          tmdb_key: rawInfo.tmdb_key,
        };

        console.log(user);

        this.update(user);
        this.setToken(res.accessToken, res.role);
      })
    );
    // (res: any) => {

    //   this.router.navigate(['./main']);
    // }
  }

  update(data: User): void {
    console.log('In user-service, new user updated', data);
    this.userSubject$.next(data);
  }

  getToken(): string {
    return this.token;
  }
  setToken(token: string, role: string): void {
    this.token = token;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    console.log('set token', token);
  }

  userUpdate(type: string): void {
    const data = {
      role: type,
    };

    this.http.patch(this.url, data).subscribe((res: any) => {
      console.log('User updated', res);
      this.token = res.accessToken;
      const newUser: User = { ...this.userSubject$.getValue(), role: type };
      this.userSubject$.next(newUser);
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('role', res.role);
    });
  }

  get(): User {
    return this.userSubject$.value;
  }

  get empty(): Boolean {
    const data = this.userSubject$.value;
    for (const [key, value] of Object.entries(data)) {
      if (value === undefined || value === '') {
        return true;
      }
    }
    return false;
  }

  clear(): void {
    this.update({ email: '' });
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
