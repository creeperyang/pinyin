const assert = require('assert')
const pinyin = require('../src')

describe('pinyin', () => {
  describe('#isSupported()', () => {
    it('should return false when not support Intl or zh-CN language', () => {
      const nodeVersion = process.versions.node || ''
      const mainVersion = +nodeVersion.split('.')[0]
      // node 13+ now supports full icu by default.
      if (mainVersion < 13) {
        assert(pinyin.isSupported() === false)
      } else {
        assert(pinyin.isSupported() === true)
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
