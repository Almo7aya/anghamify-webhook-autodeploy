module.exports = {
  name: 'anghamify-autodeploy',
  script: 'index.js',
  exec_mode: 'cluster',
  env: {
    COMMON_VARIABLE: 'true'
  },
  env_production: {
    NODE_ENV: 'production'
  }
}
