'use strict'

const {
  optionsEmberCliStringHelpers,
  optionsEmberComposableHelpers,
} = require('./options-addons')

module.exports = {
  name: require('./package').name,

  options: {
    ...optionsEmberCliStringHelpers,
    ...optionsEmberComposableHelpers,
  },
}
