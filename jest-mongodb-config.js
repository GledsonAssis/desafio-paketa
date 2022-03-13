module.exports = {
  mongodbMemoryServer: {
    version: '4.0.14'
  },
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '4.0.14',
      skipMD5: true
    },
    autoStart: false
  }
}
