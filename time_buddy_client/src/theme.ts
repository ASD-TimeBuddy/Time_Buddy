import { extendTheme } from '@chakra-ui/react';
import { theme as proTheme } from '@chakra-ui/pro-theme';
import type { ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({ ...proTheme, config });

export default theme;
