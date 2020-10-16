import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelValueComponent } from './wheel-value.component';

describe('WheelLightnessComponent', () => {
  let component: WheelValueComponent;
  let fixture: ComponentFixture<WheelValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheelValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
