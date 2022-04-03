import { AppProps } from 'next/app';
import { theme } from '../styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { SideBarDrawerProvider } from '../context/SideBarDrawerContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { makeServer } from '../services/mirage';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
     <SideBarDrawerProvider>
      <Component {...pageProps} />
     </SideBarDrawerProvider>
    </ChakraProvider>
    </QueryClientProvider>
    
  )
}

export default MyApp
