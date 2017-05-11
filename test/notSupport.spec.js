const assert = require('assert')
const PinYin = require('../src')

describe('PinYin', () => {
  describe('#isSupported()', () => {
    it('should return false when not support Intl or zh-CN language', () => {
      assert(PinYin.isSupported() === false)
    })
  })
  describe('#parse()', () => {
    it('should throw when not support Intl or zh-CN language', () => {
      try {
        PinYin.parse('我')
      } catch (e) {
        assert(e.message === 'not support Intl or zh-CN language.')
      }
    })
  })
})
