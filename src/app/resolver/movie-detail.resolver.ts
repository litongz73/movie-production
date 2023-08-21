import { MovieService } from 'src/app/services/movie.service';
import { Injectable, OnInit } from '@angular/core';

import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailResolver {
  movieID?: any;

  constructor(private mService: MovieService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id');
    if (!id) return of(null);
    return this.mService.retrieveMovieDetails(id);
  }
}
