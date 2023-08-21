import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NaviService {
  private scroll_y: number = 0;

  historySubject$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(
    false
  );
  constructor() {}

  setScrollY(input: number): void {
    this.historySubject$.next(true);
    this.scroll_y = input;
  }
  getScrollY(): number {
    this.historySubject$.next(false);
    return this.scroll_y;
  }
}
