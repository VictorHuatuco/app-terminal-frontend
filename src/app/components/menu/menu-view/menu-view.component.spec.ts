import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewComponent } from './menu-view.component';

describe('MenuViewComponent', () => {
  let component: MenuViewComponent;
  let fixture: ComponentFixture<MenuViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
