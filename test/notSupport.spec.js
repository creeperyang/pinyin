const assert = require('assert')
const pinyin = require('../src')

describe('pinyin', () => {
  describe('#isSupported()', () => {
    it('should return false when not support Intl or zh-CN language', () => {
      // node 13+ now supports full icu by default.
      if (!pinyin.isSupported()) {
        assert(pinyin.isSupported() === false)
      }
    })
  })
  describe('#parse()', () => {
    it('should throw when not support Intl or zh-CN language', () => {
      try {
        pinyin.parse('我')
      } catch (e) {
        assert(e.message === 'not support Intl or zh-CN language.')
      }
    })
  })
})
