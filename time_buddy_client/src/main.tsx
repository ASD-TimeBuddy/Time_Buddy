import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { SWRConfig } from 'swr';
import type { Fetcher, SWRConfiguration } from 'swr';

import theme from './theme';
import App from './App';

class ApiError extends Error {
  info?: any;

  status?: number;

  constructor(message?: string) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

const fetcher: Fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new ApiError('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const swrConfig: SWRConfiguration = { fetcher };

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-l82qf3dfft7e70pt.us.auth0.com'
      clientId='35WQgoj57B7WWjUGhdIDpvHRwewJdKoc'
      redirectUri={window.location.origin}
    >
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <SWRConfig value={swrConfig}>
          <App />
        </SWRConfig>
      </ChakraProvider>
    </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

