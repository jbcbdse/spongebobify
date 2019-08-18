import yargs from 'yargs';
import { writeln } from '../../write/write';
import * as spongebobify from '../spongebobify';

jest.mock('../../write/write');

const mockWriteLn = writeln as jest.MockedFunction<typeof writeln>;

describe('spongebobify', () => {
  const parser = yargs.command(spongebobify);
  const parse = (input: string) =>
    new Promise<string>((res) => {
      parser.parse(`$0 ${input}`, () => {
        res();
      });
    });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should tramsform the string', async () => {
    const input = 'aaaaaaaaa';
    await parse(input);
    const output = mockWriteLn.mock.calls[0][0];
    expect(output).not.toBe(input);
    expect(output.toLowerCase()).toBe(input);
  });
  it('should randomly start with a different case every time', async () => {
    const input = 'aaaaaaaaa';
    const times = 100;
    await Promise.all(Array.from(Array(times)).map(() => parse(input)));
    const vals = mockWriteLn.mock.calls.map((call) => call[0]);
    const someLower = vals.some((val) => val[0] === input[0].toLowerCase());
    const someUpper = vals.some((val) => val[0] === input[0].toUpperCase());
    expect(someLower).toBe(true);
    expect(someUpper).toBe(true);
  });
  const maxLettersInARow = 3;
  it(`it should never have more than ${maxLettersInARow} of the same case`, async () => {
    const input = `--maxLettersInSameCase=${maxLettersInARow} This is longer text! It contains punctuation!`;
    const times = 100;
    await Promise.all(Array.from(Array(times)).map(() => parse(input)));
    const vals = mockWriteLn.mock.calls.map((call) => call[0]);
    const lettersVals = vals.map((val) => val.replace(/[^a-z]/i, ''));
    lettersVals.forEach((letters) => {
      const tooManyLower = new RegExp(`[a-z]{${maxLettersInARow + 1}}`).test(
        letters,
      );
      const tooManyUpper = new RegExp(`[A-Z]{${maxLettersInARow + 1}}`).test(
        letters,
      );
      expect(tooManyLower).toBe(false);
      expect(tooManyUpper).toBe(false);
    });
  });
});
