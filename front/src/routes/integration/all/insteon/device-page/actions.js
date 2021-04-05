import { RequestStatus } from '../../../../../utils/consts';
import update from 'immutability-helper';
import { CATEGORY_GATEWAY } from '../../../../../../../server/services/insteon/lib/utils/const';
import createActionsHouse from '../../../../../actions/house';
//import createActionsIntegration from '../../../../../actions/integration';
import debounce from 'debounce';

function createActions(store) {
  const houseActions = createActionsHouse(store);
  //const integrationActions = createActionsIntegration(store);
  const actions = {
    async getInsteonDevices(state) {
      store.setState({
        getInsteonDevicesStatus: RequestStatus.Getting
      });
      try {
        const options = {
          order_dir: state.getPhilipsHueDeviceOrderDir || 'asc'
        };
        if (state.philipsHueDeviceSearch && state.philipsHueDeviceSearch.length) {
          options.search = state.philipsHueDeviceSearch;
        }
        const insteonDevicesReceived = await state.httpClient.get('/api/v1/service/insteon/devices', options);
        const insteonDevices = insteonDevicesReceived.filter(device => device.model !== CATEGORY_GATEWAY);
        const insteonDevicesMap = new Map();
        insteonDevices.forEach(device => insteonDevicesMap.set(device.external_id, device));
        store.setState({
          insteonDevices,
          insteonDevicesMap,
          getInsteonDevicesStatus: RequestStatus.Success
        });
        //actions.getPhilipsHueNewDevices(store.getState());
      } catch (e) {
        store.setState({
          getInsteonDevicesStatus: RequestStatus.Error
        });
      }
    },

    async beepDevice(state, externalId) {
      await state.httpClient.post('/api/v1/service/insteon/beep', { externalId });
    },

    async saveDevice(state, device, index) {
      device.room_id = device.room_id || null;
      const savedDevice = await state.httpClient.post('/api/v1/device', device);
      const newState = update(state, {
        insteonDevices: {
          $splice: [[index, 1, savedDevice]]
        }
      });
      store.setState(newState);
    },

    async createDevice(state, device) {
      store.setState({
        getPhilipsHueCreateDeviceStatus: RequestStatus.Getting
      });
      try {
        await state.httpClient.post('/api/v1/device', device);
        store.setState({
          getPhilipsHueCreateDeviceStatus: RequestStatus.Success
        });
        actions.getPhilipsHueDevices(store.getState());
      } catch (e) {
        store.setState({
          getPhilipsHueCreateDeviceStatus: RequestStatus.Error
        });
      }
    },

    updateDeviceProperty(state, index, property, value) {
      const newState = update(state, {
        insteonDevices: {
          [index]: {
            [property]: {
              $set: value
            }
          }
        }
      });
      store.setState(newState);
    },

    async deleteDevice(state, device, index) {
      await state.httpClient.delete(`/api/v1/device/${device.selector}`);
      const newState = update(state, {
        insteonDevices: {
          [index]: {
            $unset: ['id']
          }
        }
      });
      store.setState(newState);
    },

    async search(state, e) {
      store.setState({
        philipsHueDeviceSearch: e.target.value
      });
      await actions.getPhilipsHueDevices(store.getState());
    },

    async changeOrderDir(state, e) {
      store.setState({
        getPhilipsHueDeviceOrderDir: e.target.value
      });
      await actions.getPhilipsHueDevices(store.getState());
    }
  };
  actions.debouncedSearch = debounce(actions.search, 200);
  return Object.assign({}, houseActions, /*integrationActions,*/ actions);
}

export default createActions;
