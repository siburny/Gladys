const {
  DEVICE_FEATURE_CATEGORIES,
  DEVICE_FEATURE_TYPES,
  DEVICE_POLL_FREQUENCIES,
} = require('../../../../utils/constants');

const { INSTEON_EXTERNAL_ID_BASE, INSTEON_ID } = require('../utils/const');

const { getName } = require('../utils/getName');

const InsteonLight = (device, serviceId) => ({
  name: getName(device),
  service_id: serviceId,
  external_id: `${INSTEON_EXTERNAL_ID_BASE}-${device.id}`,
  selector: `${INSTEON_EXTERNAL_ID_BASE}-${device.id}`,
  should_poll: true,
  model: device.deviceCategory.id,
  poll_frequency: DEVICE_POLL_FREQUENCIES.EVERY_30_SECONDS,
  features: [
    {
      name: `On/Off`,
      read_only: false,
      has_feedback: false,
      external_id: `${INSTEON_EXTERNAL_ID_BASE}-${device.id}:${DEVICE_FEATURE_TYPES.LIGHT.BINARY}`,
      selector: `${INSTEON_EXTERNAL_ID_BASE}-${device.id}:${DEVICE_FEATURE_TYPES.LIGHT.BINARY}`,
      category: DEVICE_FEATURE_CATEGORIES.LIGHT,
      type: DEVICE_FEATURE_TYPES.LIGHT.BINARY,
      min: 0,
      max: 1,
    },
    {
      name: `Brightness`,
      read_only: false,
      has_feedback: false,
      external_id: `${INSTEON_EXTERNAL_ID_BASE}-${device.id}:${DEVICE_FEATURE_TYPES.LIGHT.BRIGHTNESS}`,
      selector: `${INSTEON_EXTERNAL_ID_BASE}-${device.id}:${DEVICE_FEATURE_TYPES.LIGHT.BRIGHTNESS}`,
      category: DEVICE_FEATURE_CATEGORIES.LIGHT,
      type: DEVICE_FEATURE_TYPES.LIGHT.BRIGHTNESS,
      min: 0,
      max: 100,
    },
  ],
  params: [
    {
      name: INSTEON_ID,
      value: device.id,
    },
  ],
});

module.exports = {
  InsteonLight,
};
