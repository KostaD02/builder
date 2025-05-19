import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

describe('LayoutService', () => {
  let service: LayoutService;
  let breakpointObserverMock: {
    observe: jest.Mock;
  };
  let matchesSubject: BehaviorSubject<BreakpointState>;

  beforeEach(() => {
    matchesSubject = new BehaviorSubject<BreakpointState>({
      matches: false,
      breakpoints: {},
    });

    breakpointObserverMock = {
      observe: jest.fn().mockReturnValue(matchesSubject.asObservable()),
    };

    TestBed.configureTestingModule({
      providers: [
        LayoutService,
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
      ],
    });

    service = TestBed.inject(LayoutService);
  });

  afterEach(() => {
    matchesSubject.complete();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false for isDesktop when matches is false', () => {
    expect(service.isDesktop()).toBe(false);
  });

  it('should return true for isDesktop when matches is true', () => {
    matchesSubject.next({ matches: true, breakpoints: {} });
    expect(service.isDesktop()).toBe(true);
  });

  it('should update isDesktop when matches changes', () => {
    matchesSubject.next({ matches: false, breakpoints: {} });
    expect(service.isDesktop()).toBe(false);

    matchesSubject.next({ matches: true, breakpoints: {} });
    expect(service.isDesktop()).toBe(true);

    matchesSubject.next({ matches: false, breakpoints: {} });
    expect(service.isDesktop()).toBe(false);
  });
});
