const INSTEON_EXTERNAL_ID_BASE = 'insteon';

const INSTEON_ID = 'id';
const INSTEON_SERIAL_PORT = 'serialport';

const PRODUCT_MODELS = {
  // Light Switch (Category 01)
  '0100': 'Insteon Switch',
  '010e': 'Insteon Switch',
  '010f': 'Insteon Switch',
  '0111': 'Insteon Switch',
  '0112': 'Insteon Switch',
  '01ef': 'Insteon Switch',
  '0120': 'Insteon Switch',
  '0121': 'Insteon Switch',
  '0122': 'Insteon Switch',
  '0123': 'Insteon Switch',
  '0124': 'Insteon Switch',
  '0125': 'Insteon Switch',
  '012d': 'Insteon Switch',

  // Gateway (Category 03)
  '0315': 'Insteon USB Gateway',
  '0320': 'Insteon USB Gateway',
  '032e': 'Insteon Hub',
  '032f': 'Insteon Hub',
  '0330': 'Insteon Hub',
  '0331': 'Insteon Hub',
  '0332': 'Insteon Hub',
  '0333': 'Insteon Hub',
  '0334': 'Insteon Hub',
  '0335': 'Insteon Hub',
  '0336': 'Insteon Hub',
  '0337': 'Insteon Hub',
};

const CATEGORY_SWITCH = 1;
const CATEGORY_GATEWAY = 3;

module.exports = {
  INSTEON_EXTERNAL_ID_BASE,
  INSTEON_ID,
  INSTEON_SERIAL_PORT,
  PRODUCT_MODELS,

  // Categories
  CATEGORY_SWITCH,
  CATEGORY_GATEWAY,
};
