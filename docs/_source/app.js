import STYLE from './app.css'

var $hanzi = document.querySelector('#hanzi')
var $pinyin = document.querySelector('#pinyin')

if (!Pinyin.isSupported()) {
  $hanzi.remove()
  $pinyin.remove()
  document.querySelector('#not-support').className = ''
} else {
  $hanzi.onkeyup = onChange
  $hanzi.onchange = onChange
  $hanzi.oncopy = onChange
}

function onChange () {
  var value = $hanzi.value
  var pinyin = ''
  if (value) {
    var tokens = Pinyin.parse($hanzi.value)
    var lastToken
    tokens.forEach((function(v, i) {
      if (v.type === 2) {
        pinyin += (pinyin && !/\n|\s/.test(lastToken.target)) ? (' ' + format(v.target)) : format(v.target)
      } else {
        pinyin += ((lastToken && lastToken.type === 2) ? ' ' : '') + v.target
      }
      lastToken = v
    }))
  }
  $pinyin.textContent = pinyin
}

function format(str) {
  if (str) {
    return str.toLowerCase()
  }
  return ''
}
