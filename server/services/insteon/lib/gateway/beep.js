const { parseExternalId } = require('../utils/parseExternalId'); 

/**
 * @description Beep device
 * @param {string} externalId - Insteon ID.
 * @returns {Promise} Returns Promise.
 * @example
 * beep('112233');
 */
async function beep(externalId) {
  if (this.gw) {
    const insteonId = parseExternalId(externalId);
    
    return this.gw.beep(insteonId);
  }

  return null;
}

module.exports = {
  beep,
};
