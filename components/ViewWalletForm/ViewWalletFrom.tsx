import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function ViewWalletFrom({ walletData }: any) {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [vs_currencies, setVs_currencies] = useState('usd');
  useEffect(() => {
    let SimplePriceString: string = 'https://api.coingecko.com/api/v3/simple/price?ids=';
    Object.keys(walletData.contents).forEach((coin) => {
      SimplePriceString += walletData.contents[coin].id + '%2C';
    });
    SimplePriceString = `${SimplePriceString.slice(0, -3)}&vs_currencies=${vs_currencies}`;
    const fetcher = (url: any) => fetch(url).then((res) => res.json());
    fetch(SimplePriceString)
      .then((res) => res.json())
      .then((json) => {
        setCurrentPrice(json);
      });
  }, []);

  if (currentPrice === null) {
    return <div>loading</div>;
  } else {
    return (
      <div>
        <p>Wallet: {JSON.stringify(walletData)}</p>
        <br />
        <p>{`Bought at: ${JSON.stringify(currentPrice)}`}</p>
        <p>{`Currently:${JSON.stringify(currentPrice)}`}</p>
        <br />
      </div>
    );
  }
}
