import { TestBed } from '@angular/core/testing';

import { AngularColorPickerService } from './angular-color-picker.service';

describe('MatColorPickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularColorPickerService = TestBed.get(AngularColorPickerService);
    expect(service).toBeTruthy();
  });
});
