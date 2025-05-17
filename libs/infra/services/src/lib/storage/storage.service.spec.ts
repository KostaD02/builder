import { TestBed } from '@angular/core/testing';
import { LocalStorageService, SessionStorageService } from './storage.service';

describe('StorageService', () => {
  let localStorageService: LocalStorageService;
  let sessionStorageService: SessionStorageService;

  beforeEach(() => {
    const windowMock = {
      btoa: (value: string) => Buffer.from(value).toString('base64'),
      atob: (value: string) => Buffer.from(value, 'base64').toString(),
    };

    TestBed.configureTestingModule({
      providers: [LocalStorageService, SessionStorageService],
    });

    localStorageService = TestBed.inject(LocalStorageService);
    sessionStorageService = TestBed.inject(SessionStorageService);

    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn(localStorageService as any, 'window', 'get')
      .mockReturnValue(windowMock);
    jest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .spyOn(sessionStorageService as any, 'window', 'get')
      .mockReturnValue(windowMock);
  });

  describe('LocalStorageService', () => {
    it('should be created', () => {
      expect(localStorageService).toBeTruthy();
    });

    it('should set and get items', () => {
      localStorageService.setItem('key', { value: 'test' });
      const item = localStorageService.getItem('key');
      expect(item).toEqual({ value: 'test' });
    });

    it('should remove items', () => {
      localStorageService.setItem('key', { value: 'test' });
      localStorageService.removeItem('key');
      const item = localStorageService.getItem('key');
      expect(item).toBeNull();
    });

    it('should clear storage', () => {
      localStorageService.setItem('key1', { value: 'test1' });
      localStorageService.setItem('key2', { value: 'test2' });
      localStorageService.clear();
      const item1 = localStorageService.getItem('key1');
      const item2 = localStorageService.getItem('key2');
      expect(item1).toBeNull();
      expect(item2).toBeNull();
    });

    it('should set and get encrypted items', () => {
      localStorageService.setEncryptedItem('key', { value: 'test' });
      const item = localStorageService.getEncodedItem('key');
      expect(item).toEqual({ value: 'test' });
    });
  });

  describe('SessionStorageService', () => {
    it('should be created', () => {
      expect(sessionStorageService).toBeTruthy();
    });

    it('should set and get items', () => {
      sessionStorageService.setItem('key', { value: 'test' });
      const item = sessionStorageService.getItem('key');
      expect(item).toEqual({ value: 'test' });
    });

    it('should remove items', () => {
      sessionStorageService.setItem('key', { value: 'test' });
      sessionStorageService.removeItem('key');
      const item = sessionStorageService.getItem('key');
      expect(item).toBeNull();
    });

    it('should clear storage', () => {
      sessionStorageService.setItem('key1', { value: 'test1' });
      sessionStorageService.setItem('key2', { value: 'test2' });
      sessionStorageService.clear();
      const item1 = sessionStorageService.getItem('key1');
      const item2 = sessionStorageService.getItem('key2');
      expect(item1).toBeNull();
      expect(item2).toBeNull();
    });

    it('should set and get encrypted items', () => {
      sessionStorageService.setEncryptedItem('key', { value: 'test' });
      const item = sessionStorageService.getEncodedItem('key');
      expect(item).toEqual({ value: 'test' });
    });
  });
});
