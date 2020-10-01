import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HueLightnessComponent } from './hue-lightness.component';

describe('HueSpectrumComponent', () => {
  let component: HueLightnessComponent;
  let fixture: ComponentFixture<HueLightnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HueLightnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HueLightnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
