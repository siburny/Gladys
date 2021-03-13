const asyncMiddleware = require('../../../api/middlewares/asyncMiddleware');

module.exports = function InsteonController(insteonGatewayHandler) {
  /**
   * @api {get} /api/v1/service/insteon/ports Get list of serial ports
   * @apiName GetPorts
   * @apiGroup Insteon
   */
  async function getPorts(req, res) {
    const ports = await insteonGatewayHandler.getPorts();
    res.json(ports);
  }

  /**
   * @api {get} /api/v1/service/insteon/ports Get list of serial ports
   * @apiName GetPorts
   * @apiGroup Insteon
   */
  async function getPort(req, res) {
    const port = await insteonGatewayHandler.getPort();
    res.json(port);
  }

  /**
   * @api {get} /api/v1/service/insteon/getGateway Check a serial port
   * @apiName GetGateway
   * @apiGroup Insteon
   */
  async function setPort(req, res) {
    await insteonGatewayHandler.setPort(req.body.serialPort);
    res.json('ok');
  }

  /**
   * @api {get} /api/v1/service/insteon/connect Check a serial port
   * @apiName CheckPort
   * @apiParam {String} portPath Serial port path
   * @apiGroup Insteon
   */
  async function connect(req, res) {
    const gw = await insteonGatewayHandler.connect(req.body.portPath);
    res.json(gw);
  }

  /**
   * @api {get} /api/v1/service/insteon/disconnect Check a serial port
   * @apiName CheckPort
   * @apiParam {String} portPath Serial port path
   * @apiGroup Insteon
   */
  async function disconnect(req, res) {
    const gw = await insteonGatewayHandler.disconnect();
    res.json(gw);
  }

  /**
   * @api {get} /api/v1/service/insteon/getGateway Get gateway info
   * @apiName CheckPort
   * @apiGroup Insteon
   */
  async function getGateway(req, res) {
    res.json(insteonGatewayHandler.insteonGateway);
  }

  /**
   * @api {get} /api/v1/service/philips-hue/light Get lights
   * @apiName GetLights
   * @apiGroup PhilipsHue
   */
  async function getLights(req, res) {
    const lights = await insteonGatewayHandler.getLights();
    res.json(lights);
  }

  /**
   * @api {get} /api/v1/service/philips-hue/scene Get scenes
   * @apiName GetScenes
   * @apiGroup PhilipsHue
   */
  async function getScenes(req, res) {
    const scenes = await insteonGatewayHandler.getScenes();
    res.json(scenes);
  }

  /**
   * @api {post} /api/v1/service/philips-hue/scene/:philipe_hue_scene_id/activate Active scene
   * @apiName Connect
   * @apiGroup PhilipsHue
   */
  async function activateScene(req, res) {
    await insteonGatewayHandler.activateScene(req.body.bridge_serial_number, req.params.philipe_hue_scene_id);
    res.json({
      success: true,
    });
  }

  return {
    'get /api/v1/service/insteon/ports': {
      authenticated: true,
      controller: asyncMiddleware(getPorts),
    },
    'get /api/v1/service/insteon/getPort': {
      authenticated: true,
      controller: asyncMiddleware(getPort),
    },
    'post /api/v1/service/insteon/setPort': {
      authenticated: true,
      controller: asyncMiddleware(setPort),
    },
    'post /api/v1/service/insteon/connect': {
      authenticated: true,
      controller: asyncMiddleware(connect),
    },
    'post /api/v1/service/insteon/disconnect': {
      authenticated: true,
      controller: asyncMiddleware(disconnect),
    },
    'get /api/v1/service/insteon/getGateway': {
      authenticated: true,
      controller: asyncMiddleware(getGateway),
    },
    'get /api/v1/service/insteon/light': {
      authenticated: true,
      controller: asyncMiddleware(getLights),
    },
    'get /api/v1/service/insteon/scene': {
      authenticated: true,
      controller: asyncMiddleware(getScenes),
    },
    'post /api/v1/service/insteon/scene/:philipe_hue_scene_id/activate': {
      authenticated: true,
      controller: asyncMiddleware(activateScene),
    },
  };
};
