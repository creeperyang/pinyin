const assert = require('assert')
const { polyphone, common } = require('./hanziDict')
const pinyin = require('../src')

describe('pinyin', () => {
  describe('#isSupported()', () => {
    it('should return true when supported', () => {
      assert(pinyin.isSupported() === true)
    })
  })
  describe('#patchDict()', () => {
    it('should patch dict correctly', () => {
      let oriDict
      let oriPINYINS
      pinyin.patchDict(dict => {
        oriDict = dict
        oriPINYINS = dict.PINYINS
      })
      assert.doesNotThrow(pinyin.patchDict)
      pinyin.patchDict([
        dict => {
          assert(oriDict === dict)
          dict.PINYINS = ['hi']
        },
        dict => {
          assert.deepStrictEqual(oriDict.PINYINS, ['hi'])
          dict.PINYINS = oriPINYINS
        }
      ])
    })
  })
  describe('#parse()', () => {
    it('should throw when argument is not string', () => {
      assert.throws(() => pinyin.parse())
    })
    it('should return empty array when argument is empty string', () => {
      assert.deepStrictEqual(pinyin.parse(''), [])
    })
    it('should parse hanzi to pinyin correctly', () => {
      assert.deepStrictEqual(pinyin.parse('我'), [{
        source: '我',
        type: 2,
        target: 'WO'
      }])
    })
    it('should parse latin to latin', () => {
      const latin = 'abcD0123'
      const res = pinyin.parse(latin)
      res.forEach((v, i) => {
        assert(v.source === latin[i])
        assert(v.type === 1)
        assert(v.target === latin[i])
      })
    })
    it('should parse unknown character to unknown character', () => {
      const unknown = '\u4000'
      const res = pinyin.parse(unknown)
      assert.deepStrictEqual(res[0].source, res[0].target)
    })
  })
  describe('#convertToPinyin()', () => {
    it('should throw when argument is not string', () => {
      assert.throws(() => pinyin.convertToPinyin())
    })
    it('should return empty string when argument is empty string', () => {
      assert(pinyin.convertToPinyin('') === '')
    })
    it('should convert hanzi to pinyin correctly', () => {
      assert(pinyin.convertToPinyin('我') === 'WO')
    })
    it('should convert latin to latin', () => {
      const latin = 'abcD0123'
      assert(pinyin.convertToPinyin(latin) === latin)
    })
    it('should convert unknown character to unknown character', () => {
      const unknown = '\u4000\u4001'
      assert(pinyin.convertToPinyin(unknown) === unknown)
    })
    it('should convert unknown character to unknown character', () => {
      const unknown = '\u4000\u4001'
      assert(pinyin.convertToPinyin(unknown) === unknown)
    })
    it('should convert all common hanzi to pinyin correctly', () => {
      let res
      // common hanzi
      for (let item in common) {
        common[item].forEach(v => {
          res = pinyin.convertToPinyin(v, '', true)
          assert(res === item)
        })
      }
      // polyphone hanzi
      for (let item in polyphone) {
        res = pinyin.convertToPinyin(item, '', true)
        assert(polyphone[item].indexOf(res) > -1)
      }
    })
  })
})
