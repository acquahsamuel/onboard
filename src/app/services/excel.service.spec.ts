/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExcelService } from './excel.service';

describe('Service: Excel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelService]
    });
  });

  it('should ...', inject([ExcelService], (service: ExcelService) => {
    expect(service).toBeTruthy();
  }));
});
