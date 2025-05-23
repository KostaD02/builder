import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should capitalize the first letter of a lowercase word', () => {
    expect(pipe.transform('hello')).toBe('Hello');
  });

  it('should return an empty string if the input is empty', () => {
    expect(pipe.transform('')).toBe('');
  });
});
