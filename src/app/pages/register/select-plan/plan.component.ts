import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user-service.service';
import { plan } from './plan.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  currentUser: User = { email: '' };
  url = 'http://127.0.0.1:4231/auth/signup';
  plans: plan[] = [
    {
      name: 'Basic',
      type: 'USER',
      price: '$9.99',
      videoQuality: 'Good',
      resolution: '480p',
    },
    {
      name: 'Standard',
      type: 'SUPERUSER',
      price: '$15.49',
      videoQuality: 'Better',
      resolution: '1080p',
    },
    {
      name: 'Premium',
      type: 'ADMIN',
      price: '$19.99',
      videoQuality: 'Best',
      resolution: '4k + HDR',
    },
  ];

  selectedPlan: plan = this.plans[0];

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.user$.subscribe((user) => {
      console.log('step3 oninit || change user', user);
      this.currentUser = { ...user, role: this.selectedPlan.type };
    });
  }

  onSelectPlan(plan: plan): void {
    this.selectedPlan = plan;
    this.currentUser.role = this.selectedPlan.type;
    this.userService.update(this.currentUser);
  }

  OnFinishRegister() {
    this.userService.userUpdate(this.selectedPlan.type);
    //this.http.post(this.url, this.currentUser).subscribe();
    // to be improved because the role definition is not clear right now

    console.log('finishRegister', this.currentUser);
    this.router.navigate(['./main']);
  }
}
