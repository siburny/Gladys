import { Text } from 'preact-i18n';
import { Component } from 'preact';
import cx from 'classnames';
import { RequestStatus } from '../../../../../utils/consts';
import DeviceForm from './DeviceForm';

class InsteonDeviceBox extends Component {
  beepDevice = async () => {
    this.setState({ loading: true });
    try {
      //await this.props.saveDevice(this.props.device, this.props.deviceIndex);
    
    } catch (e) {
      this.setState({ error: RequestStatus.Error });
    }
    this.setState({ loading: false });
  };

  saveDevice = async () => {
    this.setState({ loading: true });
    try {
      await this.props.saveDevice(this.props.device, this.props.deviceIndex);
    } catch (e) {
      this.setState({ error: RequestStatus.Error });
    }
    this.setState({ loading: false });
  };

  deleteDevice = async () => {
    this.setState({ loading: true });
    try {
      await this.props.deleteDevice(this.props.device, this.props.deviceIndex);
    } catch (e) {
      this.setState({ error: RequestStatus.Error });
    }
    this.setState({ loading: false });
  };

  render(props, { loading }) {
    return (
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">{props.device.name || <Text id="integration.mqtt.device.noNameLabel" />}</div>
          <div
            class={cx('dimmer', {
              active: loading
            })}
          >
            <div class="loader" />
            <div class="dimmer-content">
              <div class="card-body">
                <DeviceForm {...props} />

                <div class="form-group">
                  <button onClick={this.saveDevice} class="btn btn-success mr-2">
                    <Text id="integration.insteon.device.saveButton" />
                  </button>
                  <button onClick={this.deleteDevice} class="btn btn-danger mr-2">
                    <Text id="integration.insteon.device.deleteButton" />
                  </button>
                  <button onClick={this.beepDevice} class="btn btn-info float-right">
                    <Text id="integration.insteon.device.beepButton" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InsteonDeviceBox;
