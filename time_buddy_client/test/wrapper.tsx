import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';

import type { Fetcher, SWRConfiguration } from 'swr';

import theme from '../src/theme';

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

const Wrapper = ({ children }: any) => (
  <ChakraProvider theme={theme}>
    <SWRConfig value={swrConfig}>{children}</SWRConfig>
  </ChakraProvider>
);

export default Wrapper;
