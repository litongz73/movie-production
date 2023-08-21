import { NaviService } from './../../services/navi.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieItem } from 'src/app/interface/movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @Input() InputMovie?: MovieItem;

  constructor(private router: Router, private navi: NaviService) {}

  ngOnInit() {
    console.log('for individual', this.InputMovie);
  }

  toDetail(id: number | undefined) {
    // click effect, not useful before resolver
    // const container: any = document.querySelector('.Container');
    // container.classList.toggle('clicked');
    console.log('to detail', id);
    const currentScroll = window.scrollY;
    this.navi.setScrollY(currentScroll);
    this.router.navigate(['./movie/list', id]);
  }
}
