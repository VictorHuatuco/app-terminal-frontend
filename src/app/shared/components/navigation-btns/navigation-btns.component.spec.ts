import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBtnsComponent } from './navigation-btns.component';

describe('NavigationBtnsComponent', () => {
  let component: NavigationBtnsComponent;
  let fixture: ComponentFixture<NavigationBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBtnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
