/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAccessService } from './user-access.service';

describe('UserAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAccessService]
    });
  });

  it('should ...', inject([UserAccessService], (service: UserAccessService) => {
    expect(service).toBeTruthy();
  }));
});
