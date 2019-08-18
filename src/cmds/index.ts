import yargs from 'yargs';
import spongebobify from '../spongebobify';
import { writeln } from '../write/write';

export const command = '$0 [text..]';
export const desc = 'Spongebobify text';
export const builder = (y: yargs.Argv) => {
  return y
    .usage('$0 [text..]')
    .usage('$0 This is the text to transform')
    .usage('$0 "This is the text to transform"')
    .positional('text', {
      default: [],
      describe: 'The text to transform',
    })
    .options('maxLettersInSameCase', {
      default: 3,
      describe:
        'The maximum number of letters in a row that can be the same case',
      type: 'number',
    })
    .help();
};
export const handler = ({
  text,
  maxLettersInSameCase,
}: {
  text: any;
  maxLettersInSameCase: number;
}) => {
  writeln(spongebobify(maxLettersInSameCase)((text as string[]).join(' ')));
};
