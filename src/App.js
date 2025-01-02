import { Provider } from 'react-redux';
import './App.css';
import RoutingModule from './Routingmodule';
import appStore from './utils/Store/AppStore';

function App() {
  return (
    <Provider store={appStore}>
      <RoutingModule/>
    </Provider>
  );
}

export default App;
