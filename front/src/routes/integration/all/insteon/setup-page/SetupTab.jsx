import { Text } from 'preact-i18n';
//import get from 'get-value';
//import cx from 'classnames';

const connect = props => () => {
  props.connect(props.insteonSerialPort);
};

const SettingsTab = ({ children, ...props }) => (
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">
        <Text id="integration.insteon.setup.title" />
      </h2>
      <div class="page-options d-flex">
        <button class="btn btn-info" onClick={props.getPorts}>
          <Text id="integration.insteon.setup.refreshButton" />
        </button>
      </div>
    </div>

    <div class="card-body">
      <div class="dimmer-content">
        {props.insteonGateway && (
          <div class="alert alert-success">
            <Text id="integration.zwave.settings.connectedWithSuccess" />
          </div>
        )}
        {!props.insteonGateway && (
          <div class="alert alert-warning">
            <Text id="integration.zwave.settings.notConnected" />
          </div>
        )}
        {props.errorMessage && <div class="alert alert-danger">{props.errorMessage}</div>}
        <p>
          <Text id="integration.zwave.settings.description" />
        </p>
        <div class="form-group">
          <label class="form-label">
            <Text id="integration.insteon.setup.usbDriverPathLabel" />
          </label>
          <select class="form-control" onChange={props.updateSerialPort}>
            <option value="">
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
          {props.insteonSerialPort && !props.insteonGateway && (
            <button class="btn btn-success" onClick={connect(props)}>
              <Text id="integration.insteon.setup.connectButton" />
            </button>
          )}
          {props.insteonGateway && (
            <button class="btn btn-danger ml-2" onClick={props.disconnect}>
              <Text id="integration.insteon.setup.disconnectButton" />
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default SettingsTab;
