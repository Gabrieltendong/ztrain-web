import '../styles/globals.scss'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store/configureStore'


function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
