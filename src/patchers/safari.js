'use strict'

module.exports = function patcher (DICT) {
  // NOTE: patch EXCEPTIONS at last.
  DICT.EXCEPTIONS = {}
  // FU: 夫 --> 伕
  DICT.UNIHANS[91] = '\u4f15'
}
