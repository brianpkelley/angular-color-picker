import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HueSpectrumComponent } from './hue-spectrum.component';

describe('HueSpectrumComponent', () => {
  let component: HueSpectrumComponent;
  let fixture: ComponentFixture<HueSpectrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HueSpectrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HueSpectrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
