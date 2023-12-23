import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImageModalComponent } from './view-image-modal.component';

describe('ViewImageModalComponent', () => {
  let component: ViewImageModalComponent;
  let fixture: ComponentFixture<ViewImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewImageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
