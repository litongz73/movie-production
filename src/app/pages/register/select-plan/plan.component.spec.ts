import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './plan.component';
import { HttpClientModule } from '@angular/common/http';

describe('PlanComponent', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
