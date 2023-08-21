import { UrlService } from './../../../services/url.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/interface/user';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrls: ['./regform.component.scss'],
})
export class RegformComponent implements OnDestroy, OnInit {
  firstForm: FormGroup = new FormGroup({});

  url = this.UrlService.getUrl({
    domain: 'localhost',
    port: 4231,
    path: '/auth/check-email',
  });

  constructor(
    private readonly userService: UserService,
    private UrlService: UrlService,
    private router: Router,
    private readonly fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.firstForm = this.fb.group({
      email: ['', Validators.required, this.checkEmail()],
      password: ['', Validators.required],
    });
  }

  checkEmail = () => {
    return (control: FormControl): Observable<ValidationErrors | null> => {
      console.log(control.value);
      return this.http.post(this.url, { email: control.value }).pipe(
        map((result: any) => {
          console.log(result);
          if (result === true) {
            return { emilexist: true };
          } else {
            return null;
          }
        })
      );
    };
  };

  get email(): FormControl {
    return this.firstForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.firstForm.get('password') as FormControl;
  }

  ngOnDestroy(): void {}
  onSubmit(): void {
    const newUser: User = {
      email: this.email.value,
      password: this.password.value,
    };
    console.log(newUser);
    this.userService.update(newUser);
    this.router.navigate(['./register/register-step2']);
  }
}
