import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

describe('MovieService', () => {
  let service: MovieService;
  const movieUrl = new InjectionToken<string>('');
  const discoverPath = new InjectionToken<string>('');
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: movieUrl,
          useValue: 'api.themoviedb.org',
        },
        {
          provide: discoverPath,
          useValue: '/3/discover/movie',
        },
      ],
    });

    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
