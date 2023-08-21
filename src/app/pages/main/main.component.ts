import { UrlService } from '../../services/url.service';

import { Slogan } from 'src/app/interface/slogan';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  url = this.UrlService.getUrl({
    domain: 'localhost',
    port: 4231,
    path: '/auth/check-email',
  });

  form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private UrlService: UrlService
  ) {}

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required, this.checkEmail()],
    });
  }

  checkEmail = () => {
    return (control: FormControl): Observable<ValidationErrors | null> => {
      return this.http.post(this.url, { email: control.value }).pipe(
        map((result: any) => {
          // console.log(result);
          if (result === true) {
            return { emilexist: true };
          } else {
            return null;
          }
        })
      );
    };
  };

  register = () => {
    this.router.navigate(['./register/register-step1']);
  };

  slogans: Slogan[] = [
    {
      title: 'Enjoy on your TV.',
      description:
        ' Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.',
      url: 'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png',
      videoUrl:
        'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v',
    },
    {
      title: 'Watch everywhere.',
      description:
        'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.',
      url: 'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png',
      videoUrl:
        'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v',
    },
    {
      title: 'Create profiles for kids.',
      description:
        'Send kids on adventures with their favorite characters in a space made just for them—free with your membership.',
      url: 'https://occ-0-444-448.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABfpnX3dbgjZ-Je8Ax3xn0kXehZm_5L6-xe6YSTq_ucht9TI5jwDMqusWZKNYT8DfGudD0_wWVVTFLiN2_kaQJumz2iivUWbIbAtF.png?r=11f',
    },
  ];
}
