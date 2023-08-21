import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegformComponent } from './regform.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegformComponent', () => {
  let component: RegformComponent;
  let fixture: ComponentFixture<RegformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegformComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
