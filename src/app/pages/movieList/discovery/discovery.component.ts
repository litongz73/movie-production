import { NaviService } from '../../../services/navi.service';
import { Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { MovieItem } from 'src/app/interface/movie';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss'],
})
export class DiscoveryComponent implements OnInit {
  constructor(
    private router: Router,
    private movieService: MovieService,
    private navi: NaviService
  ) {}

  movies: MovieItem[] = [];
  length: number = 0;
  ngOnInit(): void {
    if (this.navi.historySubject$.value === true) {
      this.movies = this.movieService.getPreviosListByGoingback();

      const y = this.navi.getScrollY();

      setTimeout(() => {
        window.scrollTo({
          top: y,
          left: 0,
          behavior: 'smooth',
        });
      }, 1500);
    } else {
      this.movieService.retrieveList().subscribe((data) => {
        this.movies = data;
      });
    }
    console.log('current movie list', this.movies);
  }

  onScroll(): void {
    const length: number = this.movies.length / 20 + 1;

    this.movieService.retrieveList(length).subscribe((data) => {
      console.log('append new data', data);
      setTimeout(() => {
        this.movies = [...this.movies, ...data];
      }, 1000);
    });
  }
}
