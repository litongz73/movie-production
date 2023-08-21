import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayBoxComponent } from 'src/app/components/display-box/display-box.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule, FormsModule],
      declarations: [MainComponent, DisplayBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
