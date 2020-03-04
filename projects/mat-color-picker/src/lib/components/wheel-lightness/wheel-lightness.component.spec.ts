import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelLightnessComponent } from './wheel-lightness.component';

describe('WheelLightnessComponent', () => {
  let component: WheelLightnessComponent;
  let fixture: ComponentFixture<WheelLightnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheelLightnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelLightnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
