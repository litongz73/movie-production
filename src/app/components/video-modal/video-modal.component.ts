import { MovieService } from './../../services/movie.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
})
export class VideoModalComponent implements OnInit {
  @Input() movieId!: string;
  @Output() closeModalEvent = new EventEmitter();
  currentId!: string;
  constructor(private movie: MovieService) {}
  youtubeUrlList!: string[];
  index: number = 0;

  closeModal() {
    this.closeModalEvent.emit();
  }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.movie.getMovieTrailer(this.movieId).subscribe((data: string[]) => {
      // console.log('get movie url', data);
      this.youtubeUrlList = data;
      this.currentId = this.youtubeUrlList[this.index];
    });
  }

  next(): void {
    this.index = (this.index + 1) % this.youtubeUrlList.length;
    this.currentId = this.youtubeUrlList[this.index];
    console.log('on next,', this.currentId);
  }

  previous(): void {
    this.index = (this.index - 1) % this.youtubeUrlList.length;
    this.currentId = this.youtubeUrlList[this.index];
  }
}
