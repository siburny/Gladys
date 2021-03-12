const {
  InsteonGateway
} = require('./models/gateway');
const {
  INSTEON_SERIAL_PORT
} = require('./utils/const');

/**
 * @description Return Philips hue bridges.
 * @returns {Promise} Returns Promise.
 * @example
 * connect('COM1');
 */
async function reconnect() {
  const gw = await this.gladys.device.get({
    service: 'insteon',
    model: '3'
  });

  if (gw.length === 1) {
    const serialPort = gw[0].params.find(param => param.name === INSTEON_SERIAL_PORT)
    if (serialPort) {
      return this.connect(serialPort.value);
    }
  }

  return null;
}

module.exports = {
  reconnect,
};
