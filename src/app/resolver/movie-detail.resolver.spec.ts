import { TestBed } from '@angular/core/testing';

import { MovieDetailResolver } from './movie-detail.resolver';
import { HttpClientModule } from '@angular/common/http';

describe('MovieDetailResolver', () => {
  let resolver: MovieDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    resolver = TestBed.inject(MovieDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
