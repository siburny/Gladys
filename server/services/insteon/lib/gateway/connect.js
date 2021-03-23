const {
  Insteon
} = require('home-controller');
const {
  InsteonGateway
} = require('../models/gateway');

/**
 * @description Return Philips hue bridges.
 * @param {String} portPath - Serial Port path.
 * @returns {Promise} Returns Promise.
 * @example
 * connect('COM1');
 */
async function connect(portPath) {
  const that = this;

  return new Promise((resolve) => {
    this.disconnect();

    that.gw = new Insteon();

    that.gw.on('connect', async () => {
      const info = await that.gw.info();
      that.insteonGateway = InsteonGateway(info, this.serviceId, portPath);
      resolve(that.insteonGateway);
    });

    that.gw.on('error', (e) => {
      resolve();
    });

    that.gw.on('close', () => {
      that.insteonGateway = null;
    });

    that.gw.serial(portPath);
  });

}

module.exports = {
  connect,
};
