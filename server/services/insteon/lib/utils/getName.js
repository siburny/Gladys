const {
  PRODUCT_MODELS
} = require('./const');

/**
 * @description Connects to peripheral, discovers all needed, to applu action.
 * @param {Object} device - Connected Noble peripheral.
 * @returns {String} The requs=est  characteristic.
 * @example
 * await getCharacteristic({ uuid: 'peripheral' }, 'service1', 'char1')
 */
function getName(device) {
  let productCode = '';
  if (device.raw) {
    productCode = device.raw.substr(10, 4);
  }

  if (productCode && PRODUCT_MODELS[productCode]) {
    return `${PRODUCT_MODELS[productCode]}`;
  }
  return `Insteon device ${device.id}`;
}

module.exports = {
  getName,
};
