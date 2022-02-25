'use strict'

const {
  optionsEmberCliStringHelpers,
  optionsEmberComposableHelpers,
  optionsEmberMathHelpers,
} = require('./options-addons')

module.exports = {
  name: require('./package').name,

  options: {
    ...optionsEmberCliStringHelpers,
    ...optionsEmberComposableHelpers,
    ...optionsEmberMathHelpers,
  },

  included: function () {
    this._super.included.apply(this, arguments)
  },
}
