import { TestBed } from '@angular/core/testing';

import { TransactionsService } from '/home/aissata/transfert-argent/src/app/transaction.service';

describe('TransactionService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
