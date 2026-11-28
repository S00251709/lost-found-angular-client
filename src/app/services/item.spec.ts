import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ItemService } from './item';

describe('Item', () => {
  let service: ItemService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ItemService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() =>{
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
