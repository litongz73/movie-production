import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MovieModule } from '../moveList.module';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  const mockRoute = {
    snapshot: { params: { id: 123 } },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockRoute }],
      imports: [HttpClientModule, MovieModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
