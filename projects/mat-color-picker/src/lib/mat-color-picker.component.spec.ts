import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatColorPickerComponent } from './mat-color-picker.component';

describe('MatColorPickerComponent', () => {
  let component: MatColorPickerComponent;
  let fixture: ComponentFixture<MatColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
