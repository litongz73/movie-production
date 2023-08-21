import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../services/url.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorInfo, MovieItem } from 'src/app/interface/movie';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movieID?: any;
  sub: any;
  data?: any;
  imageList?: string[];
  credits?: ActorInfo[];
  showModal = false;

  get backgroundImage(): string | undefined {
    return this.data.backdrop;
  }

  private domain: string = 'https://image.tmdb.org/t/p/original';

  ngOnInit(): void {
    this.getMovieDetails();
  }

  constructor(
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private movieService: MovieService,
    private UrlService: UrlService
  ) {}

  // getMovieDetails() {
  //   this.sub = this._Activatedroute.paramMap.subscribe((params) => {
  //     console.log(params);
  //     this.movieID = params.get('id');
  //   });

  //   this.movieService.getMovieDetails(this.movieID).subscribe((data: any) => {
  //     this.data = data;
  //   });

  //   //get image List
  //   this.movieService
  //     .getImagesInDetail(this.movieID)
  //     .subscribe((data: string[]) => {
  //       this.imageList = data;
  //     });

  //   this.movieService.getCredits(this.movieID).subscribe((data: any) => {
  //     this.credits = data;
  //   });

  // }

  getMovieDetails() {
    this._Activatedroute.data.subscribe((lists: any) => {
      console.log(lists);
      this.data = lists.detailResolver[0];
      this.imageList = lists.detailResolver[1];
      this.credits = lists.detailResolver[2];
      this.movieID = this.data.id;
      // Use the individual data as needed
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
