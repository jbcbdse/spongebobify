import yargs = require('yargs');
import spongebobify from '../../spongebobify';
import * as cmd from '../index';

jest.mock('../../spongebobify');

const mockSpongebobify = spongebobify as jest.MockedFunction<
  typeof spongebobify
>;
const mockSpongebobifyInner = jest.fn(() => '');
mockSpongebobify.mockImplementation((num: number = 3) => {
  return mockSpongebobifyInner;
});

describe('$0 command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should call spongebobify with the sent text', async () => {
    const input = 'This is text';
    await yargs.command(cmd).parse(input);
    expect(mockSpongebobifyInner).toHaveBeenCalledWith(input);
  });
  it('An array of args are send concatenated, so extra spaces between them are ignored', async () => {
    const input = 'This    is     text';
    const expected = 'This is text';
    await yargs.command(cmd).parse(input);
    expect(mockSpongebobifyInner).toHaveBeenCalledWith(expected);
  });
  it('Spaces can be preserved in a quoted arg', async () => {
    const expected = 'This   arg   contains   spaces';
    const input = `"${expected}"`;
    await yargs.command(cmd).parse(input);
    expect(mockSpongebobifyInner).toHaveBeenCalledWith(expected);
  });
  it('--maxLettersInSameCase will set the val', async () => {
    const input = 'This is text';
    const maxLettersInSameCase = 4;
    await yargs
      .command(cmd)
      .parse(`--maxLettersInSameCase=${maxLettersInSameCase} ${input}`);
    expect(spongebobify).toHaveBeenCalledWith(maxLettersInSameCase);
    expect(mockSpongebobifyInner).toHaveBeenCalledWith(input);
  });
});
