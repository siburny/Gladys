import { Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from './actions';
import InsteonPage from '../InsteonPage';
import SetupTab from './SetupTab';

@connect(
  'user,serialPorts,insteonSerialPort,insteonGateway',
  actions
)
class InsteonSetupPage extends Component {
  componentWillMount() {
    this.props.load();
    this.props.getPorts();
    this.props.getInsteonGateway();
  }

  render(props, {}) {
    return (
      <InsteonPage>
        <SetupTab {...props} />
      </InsteonPage>
    );
  }
}

export default InsteonSetupPage;
