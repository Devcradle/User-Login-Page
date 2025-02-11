import { Provider } from 'react-redux';
import './App.css';
import RoutingModule from './Routingmodule';
import appStore from './utils/Store/AppStore';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    // eslint-disable-next-line max-len
    <GoogleOAuthProvider clientId="370972847903-n99dd82aqgld18jjskkperfoviei6m0g.apps.googleusercontent.com">
      <Provider store={appStore}>
        <RoutingModule />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
