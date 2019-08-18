# The Spongebob Meme Kata

An implementation of the Spongebob Meme Kata

## Description

Write a function that will take 'normal text' and convert it to 'NOrmaAl TexT'

## Implementation

It randomly capitalizes letters, but it will not have more than 3 letters in a row in the same case. (This is easily configurable) When counting, anything other than letters a-z are ignored and not transformed.

The counting is implemented with a generator that will flip a bit between 1 and 0. The bit starts randomly as 1 or 0, and the will yield the same for a random number of times between 1 and 3. After that, the bit will be flipped, and the number of times will be reset to a random number between 1 and 3 again, continuing indefinitely.

The CLI is built with yargs. The number of consecutive same-case letters can be configured with `--maxLettersInSameCase={num}`

## Tests

Tests are in Jest.

The main module test is one large unit, except for the `writeLn` function, which uses stdout. A module mock is used to mock it for the main module tests.

The `writeLn` function is tested separately simply to prove that calls `process.stdout.write`.
