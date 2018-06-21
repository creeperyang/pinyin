'use strict'

module.exports = function (config) {
  const setting = {
    basePath: '../',
    frameworks: ['mocha'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    captureTimeout: 180000,
    browserDisconnectTimeout: 180000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 300000,

    files: [
      'test/index.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'test/*.js': ['webpack']
    },
    webpack: {
      module: {
        rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['power-assert', 'es2015']
          }
        }]
      }
    },
    browsers: ['Chrome', 'Firefox', 'Safari'],
    reporters: ['progress'],
    singleRun: true
  }

  // Update config for sauce labs
  if (process.env.SAUCE) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
      process.exit(1)
    }

    const launchers = require('./browsers')
    Object.assign(setting, {
      sauceLabs: {
        testName: 'tiny-pinyin unit tests',
        retryLimit: 2,
        recordScreenshots: false,
        recordVideo: false,
        startConnect: false,
        options: {
          'selenium-version': '2.53.0',
          'command-timeout': 600,
          'idle-timeout': 600,
          'max-duration': 5400
        },
        tunnelIdentifier: 'tiny-pinyin-' + (new Date()).getTime()
      },
      customLaunchers: launchers,
      browsers: Object.keys(launchers),
      reporters: ['dots', 'saucelabs']
    })

    // Special config for travis
    if (process.env.TRAVIS) {
      setting.sauceLabs.build = process.env.TRAVIS_BUILD_NUMBER + '-' + process.env.TRAVIS_BUILD_ID
      setting.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_ID
    }
  }

  config.set(setting)
}
