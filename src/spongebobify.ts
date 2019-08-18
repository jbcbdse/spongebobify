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

const DEFAULT_MAX_SAME_CASE_CHARS = 3;
const spongebobify = (
  maxLettersInSameCase: number = DEFAULT_MAX_SAME_CASE_CHARS,
) => (text: string) => {
  const chars = text.split('');
  const bitFlipper = bitFlipperGen(maxLettersInSameCase);
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

export default spongebobify;
