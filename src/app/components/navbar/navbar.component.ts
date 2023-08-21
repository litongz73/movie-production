import { UserService } from 'src/app/services/user-service.service';
import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private UserService: UserService) {}
  username?: string;

  get loginStatus(): boolean {
    if (!this.UserService.empty) {
      const user: User = this.UserService.get();
      this.username = user.username;
      return true;
    }
    return false;
  }

  logout(): void {
    this.UserService.clear();
  }

  setTOUser(): void {
    this.UserService.userUpdate('USER');
  }
}
