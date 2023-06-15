import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { ApiLimitReachedContext } from '../context/ApiLimitModalContext';
import { useEffect, useState } from 'react';
import { ApiLimitModal } from '../components/ApiLimitModal';
export const App = ({ Component, pageProps }: AppProps) => {
  const [apiLimitReached, setApiLimitReached] = useState(false);

  return (
    <>
      <ApiLimitReachedContext.Provider value={{ apiLimitReached, setApiLimitReached }}>
        <ApiLimitModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApiLimitReachedContext.Provider>
    </>
  );
};

export default appWithTranslation(App);
