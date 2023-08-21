import { Component, Input, OnInit } from '@angular/core';
import { Slogan } from 'src/app/interface/slogan';

@Component({
  selector: 'app-display-box',
  templateUrl: './display-box.component.html',
  styleUrls: ['./display-box.component.scss'],
})
export class DisplayBoxComponent implements OnInit {
  @Input() slogan?: Slogan;
  @Input() index?: number;

  constructor() {}

  get isEven(): boolean {
    return this.index != null && this.index % 2 === 0;
  }

  ngOnInit(): void {}
}
