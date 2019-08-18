import yargs from 'yargs';
import { writeln } from '../write/write';

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function* bitFlipperGen(maxTimes: number) {
  let bit = randomInt(0, 1);
  while (true) {
    const times = randomInt(1, maxTimes);
    for (let i = 0; i < times; i++) {
      yield bit;
    }
    // tslint:disable-next-line:no-bitwise
    bit ^= 1;
  }
}

const MAX_LETTERS_IN_SAME_CASE = 3;
const spongebobify = (text: string) => {
  const chars = text.split('');
  const bitFlipper = bitFlipperGen(MAX_LETTERS_IN_SAME_CASE);
  return chars
    .map((char) => {
      const transformer = /[a-z]/i.test(char)
        ? bitFlipper.next().value
        : TransformType.SAME;
      return transform[transformer](char);
    })
    .join('');
};

enum TransformType {
  LOWER = 0,
  UPPER = 1,
  SAME = 2,
}
const transform: {
  [key: number]: (char: string) => string;
} = {
  [TransformType.LOWER]: (char) => char.toLowerCase(),
  [TransformType.UPPER]: (char) => char.toUpperCase(),
  [TransformType.SAME]: (char) => char,
};

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
export const handler = ({ text }: { text: any }) => {
  writeln(spongebobify((text as string[]).join(' ')));
};
