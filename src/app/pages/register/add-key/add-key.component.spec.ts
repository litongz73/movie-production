import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKeyComponent } from './add-key.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddKeyComponent', () => {
  let component: AddKeyComponent;
  let fixture: ComponentFixture<AddKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKeyComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
