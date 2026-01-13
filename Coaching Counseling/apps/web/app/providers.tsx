"use client";

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';

const theme = extendTheme({
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif'
  },
  colors: {
    brand: {
      50: '#e9f5ff',
      100: '#c8e4ff',
      200: '#a3d1ff',
      300: '#7dbdff',
      400: '#58aaff',
      500: '#3e90e6',
      600: '#2f70b4',
      700: '#205082',
      800: '#102f50',
      900: '#011021'
    }
  }
});

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
