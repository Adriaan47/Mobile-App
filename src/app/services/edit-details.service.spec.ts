import { TestBed } from '@angular/core/testing';

import { EditDetailsService } from './edit-details.service';

describe('EditDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditDetailsService = TestBed.get(EditDetailsService);
    expect(service).toBeTruthy();
  });
});
