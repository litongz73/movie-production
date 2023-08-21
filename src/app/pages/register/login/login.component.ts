import { UserService } from 'src/app/services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../interface/user';
import { Observable, map, tap } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUrl = 'http://127.0.0.1:4231/auth/signin';

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private UserService: UserService
  ) {}

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const userData: User = {
      email: this.email.value,
      password: this.password.value,
    };

    // console.log(userData);

    this.UserService.login(userData).subscribe(
      (res: any) => {
        this.router.navigate(['./main']);
      },
      (error: any) => {
        alert(error.message);
      }
    );

    // const dataStream$: Observable<User> = new Observable<User>((observer) => {
    //   observer.next(userData);
    //   observer.complete();
    // });

    // dataStream$.subscribe((result) => {
    //   console.log(result.username);
    //   console.log(result.password);
    // });
  }
}
