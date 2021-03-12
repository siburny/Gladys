const {
  Insteon
} = require('home-controller');
const {
  InsteonGateway
} = require('./models/gateway');

/**
 * @description Return Philips hue bridges.
 * @returns {Promise} Returns Promise.
 * @example
 * connect('COM1');
 */
async function getGateway() {
  if(this.gw) {
    const info = await this.gw.info();
    return InsteonGateway(info, this.serviceId, this.gw.comName);
  }

  return null;
}

module.exports = {
  getGateway,
};
