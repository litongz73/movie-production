import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscoveryComponent } from './discovery.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from 'src/app/services/movie.service';
import { of } from 'rxjs'; // You might need to import 'of' from 'rxjs'

describe('DiscoveryComponent', () => {
  let component: DiscoveryComponent;
  let fixture: ComponentFixture<DiscoveryComponent>;
  let movieService: MovieService; // Declare the MovieService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoveryComponent],
      imports: [HttpClientModule],
      providers: [MovieService],
    }).compileComponents();

    // Inject the MovieService and spyOn its methods
    movieService = TestBed.inject(MovieService);
    spyOn(movieService, 'getMovies').and.returnValue(of([])); // Mock getMovies method

    fixture = TestBed.createComponent(DiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
