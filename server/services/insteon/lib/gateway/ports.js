const logger = require('../../../../utils/logger');

/**
 * @description Return Philips hue bridges
 * @example
 * getBridges();
 */
async function getPorts() {
  const serialPort = require('serialport');
  const ports = await serialPort.list();
  logger.info(`InsteonService: Found ${ports.length} serial ports`);
  return ports;
}

/**
 * @description Return Philips hue bridges
 * @param {string} serialPort - Serial Port.
 * @example
 * getBridges();
 */
async function setPort(serialPort) {
  await this.gladys.variable.setValue('INSTEON_GATEWAY', serialPort, this.serviceId);
}

/**
 * @description Return Philips hue bridges
 * @returns {Promise} Serial Port.
 * @example
 * getBridges();
 */
async function getPort() {
  return this.gladys.variable.getValue('INSTEON_GATEWAY', this.serviceId);
}

module.exports = {
  getPorts,
  setPort,
  getPort
};
