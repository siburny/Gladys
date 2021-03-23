// const { activateScene } = require('./light.activateScene');
const { getPorts, setPort, getPort } = require('./gateway/ports');
const { getGateway } = require('./gateway/getGateway');
const { connect } = require('./gateway/connect');
const { disconnect } = require('./gateway/disconnect');
const { reconnect } = require('./gateway/reconnect');
const { getDevices } = require('./gateway/getDevices');
// const { init } = require('./light.init');
// const { poll } = require('./light.poll');
// const { getLights } = require('./light.getLights');
// const { getScenes } = require('./light.getScenes');
// const { setValue } = require('./light.setValue');

/**
 * @description Add ability to control a Philips Hue light
 * @param {Object} gladys - Gladys instance.
 * @param {string} serviceId - UUID of the service in DB.
 * @example
 * const exampleLightHandler = new ExampleLightHandler(gladys, client, serviceId);
 */
const InsteonGatewayHandler = function InsteonGatewayHandler(gladys, serviceId) {
  this.gladys = gladys;
  this.serviceId = serviceId;
  this.gw = null;
  this.bridgesBySerialNumber = new Map();
  this.hueApisBySerialNumber = new Map();
  this.lights = [];
};

// InsteonGatewayHandler.prototype.activateScene = activateScene;
InsteonGatewayHandler.prototype.getPorts = getPorts;
InsteonGatewayHandler.prototype.setPort = setPort;
InsteonGatewayHandler.prototype.getPort = getPort;
InsteonGatewayHandler.prototype.connect = connect;
InsteonGatewayHandler.prototype.disconnect = disconnect;
InsteonGatewayHandler.prototype.reconnect = reconnect;
InsteonGatewayHandler.prototype.getGateway = getGateway;
InsteonGatewayHandler.prototype.getDevices = getDevices;
// InsteonGatewayHandler.prototype.init = init;
// InsteonGatewayHandler.prototype.poll = poll;
// InsteonGatewayHandler.prototype.getLights = getLights;
// InsteonGatewayHandler.prototype.getScenes = getScenes;
// InsteonGatewayHandler.prototype.setValue = setValue;

module.exports = InsteonGatewayHandler;
