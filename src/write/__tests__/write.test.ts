import { writeln } from '../write';

describe('writeln', () => {
  it('should write out the given string followed by a line break', () => {
    const input = 'foo';
    const origWrite = process.stdout.write;
    const fakeWrite = jest.fn();
    process.stdout.write = fakeWrite;
    writeln(input);
    process.stdout.write = origWrite;
    expect(fakeWrite).toHaveBeenCalledWith(`${input}\n`);
  });
});
