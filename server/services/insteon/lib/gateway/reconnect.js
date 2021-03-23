const logger = require('../../../../utils/logger');
const { INSTEON_SERIAL_PORT } = require('../utils/const');

/**
 * @description Return Philips hue bridges.
 * @returns {Promise} Returns Promise.
 * @example
 * connect('COM1');
 */
async function reconnect() {
  const gw = await this.gladys.device.get({
    service: 'insteon',
    model: '3',
  });

  if (gw.length === 1) {
    const serialPort = gw[0].params.find((param) => param.name === INSTEON_SERIAL_PORT);
    if (serialPort) {
      logger.info(`Reconnecting to ${serialPort.value}`); 
      return this.connect(serialPort.value);
    }
  }

  return null;
}

module.exports = {
  reconnect,
};
