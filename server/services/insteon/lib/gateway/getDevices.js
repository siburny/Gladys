const { BRIDGE_EXTERNAL_ID_BASE } = require('../../../philips-hue/lib/utils/consts');
const { InsteonLight } = require('../models/light');

/**
 * @description Return Philips hue bridges.
 * @returns {Promise} Returns Promise.
 * @example
 * connect('COM1');
 */
async function getDevices() {
  const that = this;
  if (that.gw) {
    const links = await this.gw.links();

    const toReturn = await Promise.all(
      links.map(async link => {
        return that.gw.info(link.id).then(info => {
          switch (info.deviceCategory.id) {
            case 1:
              return InsteonLight(info, that.serviceId);
            default:
          }
        });
      })
    );

    // await new Promise(r => setTimeout(r, 5000));

    return toReturn;
  }

  return null;
}

module.exports = { getDevices };
