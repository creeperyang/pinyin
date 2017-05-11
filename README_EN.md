# tiny-pinyin [![Build Status](https://travis-ci.org/creeperyang/pinyin.svg?branch=master)](https://travis-ci.org/creeperyang/pinyin)

**A pure JavaScript lib to convert hanzi (Chinese) to pinyin with Intl API.**

The lib takes advantage of `Intl.Collator` API, and can convert hanzi to pinyin with less than 500 lines (include built-in small dict)! And the lib can be used with all browsers who support `Intl.Collator` API and support locale languages.

Features:

1. The lib is about 300 lines, very lightweight.
2. Correctly process **6763** common hanzi, as well as other hanzi.
3. Both support node.js and browser.

## Installation & Usage

Install via npm: `$ npm i tiny-pinyin --save`.

Usage:

```js
// test.js
const pinyin = require('tiny-pinyin')

if (pinyin.isSupported()) {
  pinyin.convertToPinyin('我') // WO
}
```

`node.js` default support English and if we want it support chinese(`zh-Hans-CN`), install `full-icu`:

```bash
npm i --save full-icu
```

`full-icu` will automatically install missing `ICU` data file, and then we can run `node --icu-data-dir=node_modules/full-icu test.js` to execute out code successfully.

More info with [full-icu-npm](https://github.com/unicode-org/full-icu-npm) & [Node Intl](https://github.com/nodejs/node/wiki/Intl).

## API

### 1. `pinyin.isSupported([forceDetect])`

- `forceDetect`, type is `Boolean`, set whether force re-detect.

Test whether env supoort `Intl.Collator` and `zh-CN`.

### 2. `pinyin.parse(string)`

- `string`, type is `String`

Return token list converted from specified string. Typical token:

```js
{
  type: Number, // 1-LATIN, 2-Pinyin, 3-Unknown
  source: String, // source
  target: String // converted pinyin
}
```

### 3. `pinyin.convertToPinyin(string, separator, lowerCase)`

- `string`, type is `String`.
- `separator`, type is `String`.
- `lowerCase`, type is `Boolean`. Only work for pinyin.

Return converted pinyin string.

```js
pinyin.convertToPinyin('我们a', null, false) // 'WOMENa'
pinyin.convertToPinyin('我们a', '-', true) // 'wo-men-a'
```

## Credits

Inspired by [Android Contacts Source Code](https://android.googlesource.com/platform/packages/providers/ContactsProvider/+/0c49720fb3d58e346739c2ccd56ed2b739249e07/src/com/android/providers/contacts/HanziToPinyin.java), and Thanks for their efforts.
