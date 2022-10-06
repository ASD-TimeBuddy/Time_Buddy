import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/theme';

const ThemeWrapper = ({ children }: any) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

export default ThemeWrapper;
