const { exec } = require('child_process')
const path = require('path')

const getCacheDirs = (constants) => [
  constants.PUBLISH_DIR,
  path.normalize(`${constants.PUBLISH_DIR}/../.nuxt`),
  path.normalize(`${constants.PUBLISH_DIR}/../dist`),
]
let supportIncremental = process.env.GENERATE_SUPPORT_INCREMENTAL ?? false
module.exports = {
  async onPreBuild({ constants, utils, inputs }) {
    supportIncremental = supportIncremental || inputs.supportIncremental
    // print a message if this supportsIncremental and the publish dir is equal to the dist directory
    if (supportIncremental && constants.PUBLISH_DIR === 'dist') {
      console.log(
        `You've specified that you want incremental generation but also are publishing the dist directory. Nuxt will replace the contents of dist on each build, so your cached dist directory will be lost.`
      )
    }

    const cacheDirs = getCacheDirs(constants)

    if (await utils.cache.restore(cacheDirs)) {
      console.log('Found Nuxt cache files!')
    } else {
      console.log('no files cached. Full build incoming')
    }
  },
  async onSuccess({ constants, utils, inputs }) {
    const cacheDirs = getCacheDirs(constants)
    exec(`cp dist ${constants.PUBLISH_DIR}`)
    if (await utils.cache.save(cacheDirs)) {
      console.log('Stored the Nuxt build to speed up future builds')
    } else {
      console.log('Failed to Save cache. ')
    }
  },
}
