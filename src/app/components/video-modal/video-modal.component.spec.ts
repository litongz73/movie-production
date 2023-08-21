import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoModalComponent } from './video-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from 'src/app/services/movie.service';
import { MovieModule } from 'src/app/pages/movieList/moveList.module';

describe('VideoModalComponent', () => {
  let component: VideoModalComponent;
  let fixture: ComponentFixture<VideoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoModalComponent],
      imports: [HttpClientModule, MovieModule],
      providers: [MovieService],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
