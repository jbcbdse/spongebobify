import spongebobify from '../spongebobify';

describe('spongebobify', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should tramsform the string', async () => {
    const input = 'aaaaaaaaa';
    const output = spongebobify()(input);
    expect(output).not.toBe(input);
    expect(output.toLowerCase()).toBe(input);
  });
  it('should randomly start with a different case every time', async () => {
    const input = 'aaaaaaaaa';
    const times = 100;
    const vals = Array.from(Array(times)).map(() => spongebobify()(input));
    const someLower = vals.some((val) => val[0] === input[0].toLowerCase());
    const someUpper = vals.some((val) => val[0] === input[0].toUpperCase());
    expect(someLower).toBe(true);
    expect(someUpper).toBe(true);
  });
  const maxLettersInARow = 3;
  it(`it should never have more than ${maxLettersInARow} of the same case`, async () => {
    const input = `This is longer text! It contains punctuation!`;
    const times = 100;
    Array.from(Array(times))
      .map(() => spongebobify(maxLettersInARow)(input))
      .map((text) => text.replace(/[^a-z]/i, ''))
      .forEach((letters) => {
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
