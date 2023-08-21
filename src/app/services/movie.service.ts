import { UrlService } from './url.service';
import { Inject, Injectable, OnInit } from '@angular/core';
import {
  MovieItemComplete,
  Response,
  MovieItem,
  Actor,
  ActorInfo,
  MoviePage,
} from '../interface/movie';
import { HttpClient } from '@angular/common/http';
import { discoverPath, movieUrl } from '../app.module';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  delay,
  map,
  take,
  tap,
} from 'rxjs';
import { ResolveData } from '@angular/router';
import { Url } from '../interface/url';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private api_key: string = '?api_key=' + '9b4d0b3f81f6c163aac86be798191447';
  private url: string = 'https://image.tmdb.org/t/p/';

  private currentMovieList: MoviePage[] = [];

  constructor(
    private http: HttpClient,
    private UrlService: UrlService,
    @Inject(movieUrl) private movieUrl: string,
    @Inject(discoverPath) private dicssoverPath: string
  ) {}
  ngOnInit(): void {}

  getPreviosListByGoingback(): any {
    const sortedObjects = this.currentMovieList.sort((a, b) => a.page - b.page);
    const movies: MovieItem[] = [];

    for (const obj of sortedObjects) {
      movies.push(...obj.movies);
    }
    return movies;
  }

  retrieveList(page: number = 1): Observable<MovieItem[]> {
    console.log('retrieving data');

    const list_url = this.UrlService.getUrl({
      protocal: 'https',
      domain: this.movieUrl,
      path: this.dicssoverPath,
      query: 'api_key=9b4d0b3f81f6c163aac86be798191447&page=' + `${page}`,
    });
    console.log(list_url);
    return this.http.get<Response>(list_url).pipe(
      map((response: Response) => {
        return response.results.map((movies: MovieItemComplete) => {
          return {
            id: movies.id,
            title: movies.title,
            poster: this.url + 'w500' + movies.poster_path,
            year: movies.release_date.slice(0, 4),
            rating: movies.vote_average,
            language: movies.original_language,
            overview: movies.overview,
          };
        });
      }),
      tap((data) => {
        if (
          !this.currentMovieList.find((moviePage: MoviePage) => {
            return moviePage.page === page;
          })
        ) {
          this.currentMovieList.push({ page: page, movies: data });
          console.log(
            'current movie list in movie service',
            this.currentMovieList
          );
        }
      })
    );
  }

  retrieveMovieDetails(id: any): any {
    const result = combineLatest(
      this.getMovieDetails(id),
      this.getImagesInDetail(id),
      this.getCredits(id)
    );
    return result;
  }

  // a method to get home page from individual url, can be used later to get whole data;
  getMovieDetails(id: any): any {
    const url = this.UrlService.getUrl({
      domain: 'api.themoviedb.org',
      protocal: 'https',
      path: '/3/movie/' + `${id}`,
      query: 'api_key=9b4d0b3f81f6c163aac86be798191447&language=en-US',
    });

    return this.http.get<any>(url).pipe(
      map((res: any) => {
        return {
          homepage: res.homepage,
          id: res.id,
          title: res.title,
          poster: this.url + 'w500/' + res.poster_path,
          backdrop: this.url + 'original/' + res.backdrop_path,
          year: res.release_date.slice(0, 4),
          rating: res.vote_average,
          vote_count: res.vote_count,
          language: res.original_language,
          overview: res.overview,
        };
      })
    );
  }

  getImagesInDetail(id: any): any {
    const imageList =
      'https://api.themoviedb.org/3/movie/' +
      `${id}` +
      '/images?api_key=9b4d0b3f81f6c163aac86be798191447';
    const eachImage = 'https://image.tmdb.org/t/p/w342';
    return this.http.get<any>(imageList).pipe(
      map((responses: any) => {
        return responses.backdrops.reduce((acc: string[], curr: any) => {
          return [...acc, eachImage + curr.file_path];
        }, []);
      })
    );
  }

  getCredits(id: any): any {
    //https://api.themoviedb.org/3/movie/502357/credits?api_key=9b4d0b3f81f6c163aac86be798191447
    const credit_url = this.UrlService.getUrl({
      protocal: 'https',
      domain: this.movieUrl,
      path: '/3/movie/' + `${id}` + '/credits',
      query: 'api_key=9b4d0b3f81f6c163aac86be798191447',
    });
    console.log(credit_url);
    return this.http.get<any>(credit_url).pipe(
      map((response: any) => {
        return response.cast.map((cast: Actor) => {
          return {
            name: cast.name,
            char: cast.character,
            profile: 'https://image.tmdb.org/t/p/w185/' + cast.profile_path,
          } as ActorInfo;
        });
      }),
      delay(3000)
    );
  }

  getMovieTrailer(id: any): any {
    const url = this.UrlService.getUrl({
      protocal: 'https',
      domain: this.movieUrl,
      path: '/3/movie/' + `${id}` + '/videos',
      query: 'api_key=9b4d0b3f81f6c163aac86be798191447',
    });
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return response.results.map((result: any) => {
          return result.key;
        });
      })
    );
  }
}
