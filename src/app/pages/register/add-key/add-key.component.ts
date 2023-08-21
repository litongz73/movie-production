import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/interface/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.component.html',
  styleUrls: ['./add-key.component.scss'],
})
export class AddKeyComponent implements OnDestroy, OnInit {
  secondForm: FormGroup = new FormGroup({});
  currentUser: User = { email: '' };
  constructor(
    private readonly userService: UserService,
    private router: Router,
    private readonly fb: FormBuilder
  ) {}

  get username() {
    return this.secondForm.get('username') as FormControl;
  }

  get key(): FormControl {
    return this.secondForm.get('key') as FormControl;
  }

  ngOnInit(): void {
    this.secondForm = this.fb.group({
      username: ['', Validators.required],
      key: ['', Validators.required],
    });

    this.userService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {}

  onSubmit(): void {
    const newUser: User = {
      ...(this.currentUser as User),
      username: this.username.value,
      tmdb_key: this.key.value,
    };
    console.log('step2 onsubmit', newUser);
    this.userService.update(newUser);
    this.currentUser = newUser;
    this.router.navigate(['./register/register-step3']);
  }
}
