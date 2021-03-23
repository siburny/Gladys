import { Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from './actions';
import InsteonPage from '../InsteonPage';
import DevicePage from './DevicePage';
//import FoundDevices from './FoundDevices';

@connect(
  'session,user,insteonDevices,houses,getInsteonDevicesStatus,philipsHueNewDevices,getPhilipsHueCreateDeviceStatus,getPhilipsHueNewDevicesStatus',
  actions
)
class InsteonDevicePage extends Component {
  componentWillMount() {
    this.props.getInsteonDevices();
    //this.props.getHouses();
    //this.props.getPhilipsHueNewDevices();
    this.props.getIntegrationByName('insteon');
  }

  render(props, {}) {
    return (
      <InsteonPage>
        <DevicePage {...props} />
        {/* <FoundDevices {...props} /> */}
      </InsteonPage>
    );
  }
}

export default InsteonDevicePage;
