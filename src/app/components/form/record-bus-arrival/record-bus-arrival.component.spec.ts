import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordBusArrivalComponent } from './record-bus-arrival.component';

describe('RecordBusArrivalComponent', () => {
  let component: RecordBusArrivalComponent;
  let fixture: ComponentFixture<RecordBusArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordBusArrivalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordBusArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
