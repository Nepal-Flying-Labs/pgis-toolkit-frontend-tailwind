import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
// import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import ErrorBoundary from '@Components/common/ErrorBoundary/index';
import App from './app';
// import Loader from './components/common/Loader';
import configureStore from './store';
import history from './utils/history';
import './assets/css/index.css';

const { store } = configureStore();

Sentry.init({
  dsn: process.env.SENTRY_DNS_URL,
  integrations: [new BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.2,
});

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
      <ErrorBoundary>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </ErrorBoundary>
      {/* </PersistGate> */}
    </Provider>,
    document.getElementById('app'),
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default;
    render(NextApp);
  });
}
