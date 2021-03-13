import update from 'immutability-helper';
import get from 'get-value';
import { RequestStatus } from '../../../../../utils/consts';

const actions = store => ({
  async load(state) {
    const insteonSerialPort = await state.httpClient.get('/api/v1/service/insteon/getPort');
    store.setState({
      insteonSerialPort
    });
  },

  async getPorts(state) {
    try {
      const serialPorts = await state.httpClient.get('/api/v1/service/insteon/ports');
      store.setState({
        serialPorts
      });
    } catch (e) {
      store.setState({
        serialPortStatus: RequestStatus.Error,
        serialPortStatusError: e.message
      });
    }
  },

  async updateSerialPort(state, e) {
    try {
      await state.httpClient.post('/api/v1/service/insteon/setPort', {
        serialPort: e.target.value
      });

      store.setState({
        insteonSerialPort: e.target.value
      });
    } catch (e) {
      store.setState({
        serialPortStatus: RequestStatus.Error,
        serialPortStatusError: e.message
      });
    }
  },

  async connect(state, portPath) {
    if (!portPath) {
      return;
    }
    try {
      const insteonGateway = await state.httpClient.post('/api/v1/service/insteon/connect', {
        portPath
      });

      await state.httpClient.post('/api/v1/device', insteonGateway);

      store.setState({
        insteonGateway
      });
    } catch (e) {
      store.setState({
        zwaveConnectionInProgress: true
      });
    }
  },

  async disconnect(state) {
    try {
      let insteonGateway = state.insteonGateway;

      await state.httpClient.post('/api/v1/service/insteon/disconnect', {
        insteonGateway
      });

      insteonGateway = null;
      store.setState({
        insteonGateway,
        philipsHueGetDevicesStatus: RequestStatus.Success
      });
    } catch (e) {
      store.setState({
        philipsHueGetDevicesStatus: RequestStatus.Error,
        philipsHueGetDevicesError: e.message
      });
    }
  },

  async getInsteonGateway(state) {
    const insteonGateway = await state.httpClient.get('/api/v1/service/insteon/getGateway');
    store.setState({
      insteonGateway
    });
  }
});

export default actions;
