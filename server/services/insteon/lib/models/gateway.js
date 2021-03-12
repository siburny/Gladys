const {
  DEVICE_POLL_FREQUENCIES,
} = require('../../../../utils/constants');

const {
  INSTEON_EXTERNAL_ID_BASE,
  INSTEON_ID,
  INSTEON_SERIAL_PORT
} = require('../utils/const');

const {
  getName
} = require('../utils/getName');

const InsteonGateway = (device, serviceId, comPath) => ({
  name: getName(device),
  service_id: serviceId,
  external_id: `${INSTEON_EXTERNAL_ID_BASE}-${device.id}`,
  selector: `${INSTEON_EXTERNAL_ID_BASE}-${device.id}`,
  model: device.deviceCategory.id,
  should_poll: false,
  poll_frequency: 5 * DEVICE_POLL_FREQUENCIES.EVERY_MINUTES,
  features: [],
  params: [{
      name: INSTEON_ID,
      value: device.id,
    },
    {
      name: INSTEON_SERIAL_PORT,
      value: comPath,
    },
  ],
});

module.exports = {
  InsteonGateway,
};
