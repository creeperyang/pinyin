const assert = require('assert')
const { polyphone, common } = require('./hanziDict')
let PinYin

describe('PinYin', () => {
  before(done => {
    // Dynamically load lib
    if (typeof window === 'object' && window.window === window) {
      PinYin = require('../src/browser')
    } else {
      PinYin = require('../src/index')
    }
    done()
  })

  describe('#isSupported()', () => {
    it('should return true when supported', () => {
      assert(PinYin.isSupported() === true)
    })
  })
  describe('#patchDict()', () => {
    it('should patch dict correctly', () => {
      let oriDict
      let oriPINYINS
      PinYin.patchDict(dict => {
        oriDict = dict
        oriPINYINS = dict.PINYINS
      })
      assert.doesNotThrow(PinYin.patchDict)
      PinYin.patchDict([
        dict => {
          assert(oriDict === dict)
          dict.PINYINS = ['hi']
        },
        dict => {
          assert.deepEqual(oriDict.PINYINS, ['hi'])
          dict.PINYINS = oriPINYINS
        }
      ])
    })
  })
  describe('#parse()', () => {
    it('should throw when argument is not string', () => {
      assert.throws(() => PinYin.parse())
    })
    it('should return empty array when argument is empty string', () => {
      assert.deepEqual(PinYin.parse(''), [])
    })
    it('should parse hanzi to pinyin correctly', () => {
      assert.deepEqual(PinYin.parse('我'), [{
        source: '我',
        type: 2,
        target: 'WO'
      }])
    })
    it('should parse latin to latin', () => {
      const latin = 'abcD0123'
      const res = PinYin.parse(latin)
      res.forEach((v, i) => {
        assert(v.source === latin[i])
        assert(v.type === 1)
        assert(v.target === latin[i])
      })
    })
    it('should parse unknown character to unknown character', () => {
      const unknown = '\u4000'
      const res = PinYin.parse(unknown)
      assert.deepEqual(res[0].source, res[0].target)
    })
  })
  describe('#convertToPinyin()', () => {
    it('should throw when argument is not string', () => {
      assert.throws(() => PinYin.convertToPinyin())
    })
    it('should return empty string when argument is empty string', () => {
      assert(PinYin.convertToPinyin('') === '')
    })
    it('should convert hanzi to pinyin correctly', () => {
      assert(PinYin.convertToPinyin('我') === 'WO')
    })
    it('should convert latin to latin', () => {
      const latin = 'abcD0123'
      assert(PinYin.convertToPinyin(latin) === latin)
    })
    it('should convert unknown character to unknown character', () => {
      const unknown = '\u4000\u4001'
      assert(PinYin.convertToPinyin(unknown) === unknown)
    })
    it('should convert unknown character to unknown character', () => {
      const unknown = '\u4000\u4001'
      assert(PinYin.convertToPinyin(unknown) === unknown)
    })
    it('should convert all common hanzi to pinyin correctly', () => {
      let res
      // common hanzi
      for (let item in common) {
        common[item].forEach(v => {
          res = PinYin.convertToPinyin(v, '', true)
          assert(res === item)
        })
      }
      // polyphone hanzi
      for (let item in polyphone) {
        res = PinYin.convertToPinyin(item, '', true)
        assert(polyphone[item].indexOf(res) > -1)
      }
    })
  })
})
