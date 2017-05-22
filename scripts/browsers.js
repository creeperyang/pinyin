module.exports = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest-2',
    group: 0
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest-1',
    group: 1
  },
  // Seems Edge has some problem.
  /*
  sl_edge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    version: '14.14393',
    platform: 'Windows 10',
    group: 2
  },
  */
  sl_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '10.0',
    platform: 'macOS 10.12',
    group: 3
  },
  sl_ios_safari: {
    base: 'SauceLabs',
    browserName: 'Safari',
    appiumVersion: '1.6.4',
    platformName: 'iOS',
    platformVersion: '10.2',
    deviceName: 'iPhone 7 Plus Simulator',
    group: 3
  }
  // We should patch dict for Android.
  /*
  ,
  sl_android_4_4: {
    base: 'SauceLabs',
    browserName: 'Browser',
    appiumVersion: '1.6.4',
    platformName: 'Android',
    platformVersion: '4.4',
    deviceName: 'Android Emulator',
    group: 4
  },
  sl_android_6: {
    base: 'SauceLabs',
    browserName: 'Chrome',
    appiumVersion: '1.6.4',
    platformName: 'Android',
    platformVersion: '6.0',
    deviceName: 'Android Emulator',
    group: 4
  }
  */
}
