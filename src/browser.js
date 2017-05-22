'use strict'

const pinyin = require('./index')
const patcher = require('./patchers/safari')

// Patch dict for safari.
if (typeof navigator === 'object' && /safari/i.test(navigator.userAgent)) {
  pinyin.patchDict(patcher)
}

module.exports = pinyin
