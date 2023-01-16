import { useState } from 'react';
import useSWR from 'swr';

export default function ViewWalletFrom({ walletData }: any) {
  const useGetCoinData = (walletData: any, coinsPriceHistory: any) => {
    // Create id list for coingecko
    let coinIdString: string = '';
    Object.keys(walletData.contents).forEach((coin) => {
      coinIdString += walletData.contents[coin].id + ',';
      console.log(coin, walletData.contents[coin].id);
    });
    coinIdString = coinIdString.slice(0, -1);
    // const { data, error, isLoading } = useSWR('/api/user/123', fetcher);
    // if (error) return <div>failed to load</div>;
    // if (isLoading) return <div>loading...</div>;
    const { data, error, isLoading } = useSWR('/api/user', fetcher);
    console.log(walletData);
  };

  const [coinsPriceHistory, setCoinsPriceHistory] = useState([]);
  useGetCoinData(walletData, coinsPriceHistory);
  return (
    <div>
      <p>Wallet: {JSON.stringify(walletData)}</p>
      <br />
      <p>{coinsPriceHistory}</p>
      <br />
    </div>
  );
}
