import { TestBed } from '@angular/core/testing';

import { GestorGuard } from './gestor.guard';

describe('GestorGuard', () => {
  let guard: GestorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
