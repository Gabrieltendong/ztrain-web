import '../styles/globals.scss'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store/configureStore'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../config/theme';


function MyApp({ Component, pageProps }) {

  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
  )
}

export default MyApp
