# pinyin

**A pure JavaScript lib to convert hanzi (Chinese) to pinyin with Intl API.**

The lib takes advantage of `Intl.Collator` API, and can convert hanzi to pinyin with less than 500 lines (include built-in small dict)! And the lib can be used with all browsers who support `Intl.Collator` API and support locale languages.

这是一个处理 **汉字转拼音** 的轻量级JavaScript库。有以下特性：

1. 300行左右代码，内置一个很小的字典。
2. 可以轻松处理6763个的常用汉字，其它汉字未测试，但应该有相当正确率，欢迎测试。
3. 可以工作在node.js端和浏览器端。

## Installation & Usage

安装：

```bash
$ npm i tiny-pinyin --save
```

Node 使用:

```js
// test.js
const pinyin = require('tiny-pinyin')

if (pinyin.isSupported()) {
  pinyin.convertToPinyin('我') // WO
}
```

一般情况下，我们的`node.js`只支持英文，所以，如果希望`pinyin.isSupported()`为`true`，我们需要让`node.js`支持中文（`zh-Hans-CN`）：

```bash
npm i --save full-icu
```

通过安装`full-icu`，我们可以安装缺失的`ICU`数据文件，使`node.js`支持中文。通过`node --icu-data-dir=node_modules/full-icu test.js`即可得到想要的结果。

更多相关信息可以参考 [full-icu-npm](https://github.com/unicode-org/full-icu-npm)，或者 [Node Intl](https://github.com/nodejs/node/wiki/Intl)。

## Credits

Thanks to [Android Contacts Source Code](https://android.googlesource.com/platform/packages/providers/ContactsProvider/+/0c49720fb3d58e346739c2ccd56ed2b739249e07/src/com/android/providers/contacts/HanziToPinyin.java). The lib is inspired by it.
