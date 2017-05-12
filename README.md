# tiny-pinyin [![Build Status](https://travis-ci.org/creeperyang/pinyin.svg?branch=master)](https://travis-ci.org/creeperyang/pinyin)

[English Doc](./README_EN.md)

轻量的 **汉字转拼音** JavaScript库。可以轻松获取汉字的拼音。有以下特性：

1. 300行左右代码，内置一个很小的字典。
2. 可以轻松处理 **6763** 个的常用汉字，其它汉字未测试，但应该有相当正确率，欢迎测试。
3. 同时支持 **node.js和浏览器** 。

[![Demo](https://cloud.githubusercontent.com/assets/8046480/25986097/a86896c2-3720-11e7-9bfe-17285f8005f0.png)](https://creeperyang.github.io/pinyin/)

可点击上面的图片体验[线上版本](https://creeperyang.github.io/pinyin/)。

## 安装和使用

安装：`$ npm i --save tiny-pinyin`

使用:

```js
// test.js
const pinyin = require('tiny-pinyin')

if (pinyin.isSupported()) {
  pinyin.convertToPinyin('我') // WO
}
```

一般情况下，我们的`node.js`只支持英文，所以，我们需要让`node.js`支持中文（`zh-Hans-CN`），即`pinyin.isSupported()`为`true`：

```bash
npm i --save full-icu
```

通过安装`full-icu`，我们可以安装缺失的`ICU`数据文件，使`node.js`支持中文。通过`node --icu-data-dir=node_modules/full-icu test.js`即可使`node.js`支持全语言，正确把汉字转为拼音。

更多相关信息可以参考 [full-icu-npm](https://github.com/unicode-org/full-icu-npm)，或者 [Node Intl](https://github.com/nodejs/node/wiki/Intl)。

## API

### 1. `pinyin.isSupported([forceRedetect])`

- `forceRedetect`，`bool`类型，是否强制重新检测。

测试环境是否支持`Intl.Collator`以及`zh-CN`。本库所有功能依赖此支持。默认只检测一次，可以置`forceRedetect`为`true`强制重新检测。

### 2. `pinyin.parse(string)`

- `string`，待转成拼音的字符串。

返回指定字符串转成的token数组。典型的token格式如下：

```js
{
  type: Number, // 1-拉丁, 2-拼音, 3-未知
  source: String, // 源字符
  target: String // 目标字符
}
```

**请注意，当字符串为**

1. 拉丁字母，即ascii码`0-255`，不处理，原样输出，即`source/target`一致，`type`为`1`。
2. 中文，即unicode `\u4e00-\u9FFF` ，转成拼音，`type`为`2`。
3. 其它，即以上两者以外的字符，不处理，原样输出，`type`为`3`。

### 3. `pinyin.convertToPinyin(string, separator, lowerCase)`

- `string`，待转成拼音的字符串。
- `separator`，拼音的分隔符，默认`''`。比如设置`-`，则`我们`转成`WO-MEN`。
- `lowerCase`，转成的拼音是否小写，默认`false`。仅对中文转成的拼音起效（对拉丁文字和其它文字无效）。

返回指定字符串转成的拼音字符串。

```js
pinyin.convertToPinyin('我们和他们', '-', true) // wo-men-he-ta-men
```

## 致谢

感谢博客[利用Android源码，轻松实现汉字转拼音功能](http://blog.coderclock.com/2017/04/04/android/2017-04-04/)，由这篇博客才知道Android库的相关代码和汉字转拼音的原理。

非常感谢 [Android Contacts Source Code](https://android.googlesource.com/platform/packages/providers/ContactsProvider/+/0c49720fb3d58e346739c2ccd56ed2b739249e07/src/com/android/providers/contacts/HanziToPinyin.java)。本库由它启发，可以算作Java到JavaScript的一次转译。
