import { Text } from 'preact-i18n';
import get from 'get-value';
import cx from 'classnames';

const SettingsTab = ({ children, ...props }) => (
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">
        <Text id="integration.zwave.settings.title" />
      </h2>
      <div class="page-options d-flex">
        <button class="btn btn-info" onClick={props.getPorts}>
          <Text id="integration.zwave.settings.refreshButton" />
        </button>
      </div>
    </div>
    <div class="card-body">
      <div
        class={cx('dimmer', {
          active: props.loading
        })}
      >
        <div class="loader" />
        <div class="dimmer-content">
          {get(props, 'zwaveStatus.ready') && (
            <div class="alert alert-success">
              <Text id="integration.zwave.settings.connectedWithSuccess" />
            </div>
          )}
          {!get(props, 'zwaveStatus.ready') && (
            <div class="alert alert-warning">
              <Text id="integration.zwave.settings.notConnected" />
            </div>
          )}
          {props.zwaveConnectionInProgress && (
            <div class="alert alert-info">
              <Text id="integration.zwave.settings.connecting" />
            </div>
          )}
          {props.zwaveDriverFailed && (
            <div class="alert alert-danger">
              <Text id="integration.zwave.settings.driverFailedError" />
            </div>
          )}
          <p>
            <Text id="integration.zwave.settings.description" />
          </p>
          <div class="form-group">
            <label class="form-label">
              <Text id="integration.zwave.settings.zwaveUsbDriverPathLabel" />
            </label>
            <select class="form-control" onChange={props.updateSerialPort}>
              <option>
                <Text id="global.emptySelectOption" />
              </option>
              {props.serialPorts &&
                props.serialPorts.map(port => (
                  <option value={port.path} selected={props.insteonSerialPort === port.path}>
                    {port.path}
                  </option>
                ))}
            </select>
          </div>
          <div class="form-group">
            <button class="btn btn-success" onClick={props.connect}>
              <Text id="integration.zwave.settings.connectButton" />
            </button>
            <button class="btn btn-danger ml-2" onClick={props.disconnect}>
              <Text id="integration.zwave.settings.disconnectButton" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsTab;
