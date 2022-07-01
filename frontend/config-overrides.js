/* config-overrides.js */
const path = require('path');
const {alias} = require('react-app-rewire-alias')
 
module.exports = function override(config) {

  alias({
    "@common": `${path.resolve()}/src/common/index.js`,
    "@components": `${path.resolve()}/src/components/index.js`,
    "@pages": `${path.resolve()}/src/pages/index.js`,
    "@utils": `${path.resolve()}/src/utils/index.js`,
    "@flow": `${path.resolve()}/src/flow/index.js`,
    "@locale": `${path.resolve()}/src/locale/index.js`,
    "@config": `${path.resolve()}/src/appConfig.js`,
    "@dom": `${path.resolve()}/src/DOM/index.js`,
  })(config)
 
  return config
};
