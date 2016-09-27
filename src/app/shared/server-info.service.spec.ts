/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServerInfoService } from './server-info.service';

describe('Service: ServerInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerInfoService]
    });
  });

  it('should ...', inject([ServerInfoService], (service: ServerInfoService) => {
    expect(service).toBeTruthy();
  }));
});
