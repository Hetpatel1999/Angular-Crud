import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrakingComponent } from './order-traking.component';

describe('OrderTrakingComponent', () => {
  let component: OrderTrakingComponent;
  let fixture: ComponentFixture<OrderTrakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTrakingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
