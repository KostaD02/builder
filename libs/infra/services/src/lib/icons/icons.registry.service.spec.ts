import { TestBed } from '@angular/core/testing';
import { IconsRegistryService } from './icons-registry.service';

describe('IconsRegistryService', () => {
  let service: IconsRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IconsRegistryService],
    });

    service = TestBed.inject(IconsRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the icon registry', () => {
    const iconRegistrySpy = jest.spyOn(
      service['iconRegistry'],
      'addSvgIconLiteral',
    );
    const sanitizerSpy = jest.spyOn(
      service['sanitizer'],
      'bypassSecurityTrustHtml',
    );

    service.init();

    expect(iconRegistrySpy).toHaveBeenCalledTimes(service.icons.length);
    expect(sanitizerSpy).toHaveBeenCalledTimes(service.icons.length);

    iconRegistrySpy.mockRestore();
    sanitizerSpy.mockRestore();
  });
});
