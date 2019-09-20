import { TestBed } from '@angular/core/testing';

import { MatColorPickerService } from './mat-color-picker.service';

describe('MatColorPickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatColorPickerService = TestBed.get(MatColorPickerService);
    expect(service).toBeTruthy();
  });
});
