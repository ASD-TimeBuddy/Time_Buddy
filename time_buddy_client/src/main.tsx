import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';

import theme from './theme';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <App />
        </SWRConfig>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
