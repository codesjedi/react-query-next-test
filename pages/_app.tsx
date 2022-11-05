import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '../styles/globals.css';

import { queryClient } from '../config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' && (
        <ReactQueryDevtools />
      )}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
