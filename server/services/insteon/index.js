const { Insteon } = require('home-controller');
const logger = require('../../utils/logger');

const InsteonGatewayHandler = require('./lib/');
const InsteonController = require('./api/insteon.controller');

module.exports = function InsteonService(gladys, serviceId) {
  const insteonGatewayHandler = new InsteonGatewayHandler(gladys, serviceId);

  /**
   * @public
   * @description This function starts the InsteonService service
   * @example
   * gladys.services['insteon'].start();
   */
  async function start() {
    logger.log('starting Insteon service');

    await insteonGatewayHandler.reconnect();
  }

  /**
   * @public
   * @description This function stops the InsteonService service
   * @example
   *  gladys.services['insteon'].stop();
   */
  async function stop() {
    logger.log('stopping Insteon service');

    await insteonGatewayHandler.disconnect();
  }

  return Object.freeze({
    start,
    stop,
    device: () => {}, // philipsHueLightHandler,
    controllers: InsteonController(insteonGatewayHandler),
  });
};
