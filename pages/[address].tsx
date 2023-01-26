import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WalletFormData, WalletFormDataType } from '../components/types/WalletFormDisplay';
import ViewWalletFrom from '../components/ViewWalletForm/ViewWalletFrom';
import useSWR from 'swr';
import { CoinsSlashMarkets } from '../components/types/CoinGeckoTypes';
const fetcher = (url: any) => fetch(url).then((res) => res.json());

const WalletView = () => {
  const [coinsArr, setCoinsArr] = useState<CoinsSlashMarkets[] | undefined>();
  const router = useRouter();
  const { address } = router.query;
  const [walletData, setWalletData] = useState<WalletFormDataType | undefined>(undefined);
  const { data, error } = useSWR(
    `https://www.farazywallet.com/api/v1/wallet?address=${router.query.address}`,
    fetcher
  );
  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';
  return (
    <>
      <ViewWalletFrom walletData={data} coinsArr={coinsArr} setCoinsArr={setCoinsArr} />
    </>
  );
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {s}

export default WalletView;
