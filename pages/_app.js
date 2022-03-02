import '../styles/globals.scss'
import { Provider } from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store/configureStore'

const stripePromise = loadStripe('pk_test_51IXWRdEwEvnp4vKjxmqVjh9BDJ2D6Q1CkIqZ9k867Pf0qtNogX2oobbRs0VyhP7EebhTQulY3tvDbQN15ECHFEm300daCvEjOj');

function MyApp({ Component, pageProps }) {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51IXWRdEwEvnp4vKjnwnqgkPLeUO8VdxVoflYOT7Wzs15PkOV0cZVei3neoMOO83hBwUbijP6C20bxc8mOWSEBeNf00d2VTILmA',
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Elements stripe={stripePromise} options={options}>
          <Component {...pageProps} />
        </Elements> 
      </PersistGate>
    </Provider>
  )
}

export default MyApp
