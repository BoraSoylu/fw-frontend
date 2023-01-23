import { useEffect, useState } from 'react';
import {
  WalletFormDataType,
  CoinDetailsViewType,
  WalletContentsType,
} from '../types/WalletFormDisplay';
import { CoinsSlashMarkets } from '../types/CoinGeckoTypes';
import Image from 'next/image';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

export default function ViewWalletFrom({ walletData }: { walletData: WalletFormDataType }) {
  const [vsCurrencies, setVsCurrencies] = useState('usd');
  const [coinsArr, setCoinsArr] = useState<CoinsSlashMarkets[] | undefined | null>();

  useEffect(() => {
    // Map fw backend wallet response coins into an array
    let walletContentsArr: CoinDetailsViewType[] = [];
    Object.keys(walletData.contents).map(
      (contentsCoinKey: any, i) => walletContentsArr.push(walletData.contents[contentsCoinKey]) // ?? wat?
    );
    //base url for coingecko coins/markets
    let CoinsSlashMarketsURL = 'https://api.coingecko.com/api/v3/coins/markets?';
    //add vs_currency to request url
    CoinsSlashMarketsURL = `${CoinsSlashMarketsURL}vs_currency=${vsCurrencies}&ids=`;
    //add wallet contents to request url
    walletContentsArr.forEach((coin) => {
      CoinsSlashMarketsURL = CoinsSlashMarketsURL.concat(`${coin.id}%2C`);
    });
    //trim end of url
    CoinsSlashMarketsURL = CoinsSlashMarketsURL.slice(0, -3);
    console.log(CoinsSlashMarketsURL);
    if (hasCookie(walletData.address)) {
      let coins: CoinsSlashMarkets[] = [];
      walletContentsArr.forEach((coin) => {
        coins.push(JSON.parse(getCookie(coin.id)));
      });
      setCoinsArr(coins);
    } else {
      const getBoughtAmount = (id: string, attribute: string) => {
        let returnVar: any;
        walletContentsArr.forEach((coin) => {
          if (attribute === 'amount' && coin.id === id) {
            console.log(coin.price);

            returnVar = coin.amount;
          }
          if (attribute === 'price' && coin.id === id) {
            console.log(coin.price);

            returnVar = coin.price;
          }
        });
        return returnVar;
      };
      fetch(CoinsSlashMarketsURL)
        .then((response) => response.json())
        .then((data) => {
          const coins: CoinsSlashMarkets[] = data;
          coins.forEach((coin) => {
            coin.bought_amount = getBoughtAmount(coin.id, 'amount');
            coin.bought_price = getBoughtAmount(coin.id, 'price');
          });
          console.log(new TextEncoder().encode(JSON.stringify(coins)).length);

          coins.forEach((coin) => {
            setCookie(coin.id, JSON.stringify(coin), { maxAge: 120 });
          });
          setCookie(walletData.address, 'true', { maxAge: 120 });
          setCoinsArr(coins);
        })
        .catch(() => {
          setCoinsArr(undefined);
        });
    }
  }, []);
  const formatCurrency = (number: number) => {
    return `${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: vsCurrencies.toUpperCase(),
      maximumFractionDigits: 20,
    }).format(number)}`;
  };
  const calculateGainLoss = (coin: CoinsSlashMarkets) => {
    return `${formatCurrency(coin.current_price - coin.bought_price * coin.bought_amount)} (${
      coin.current_price > coin.bought_price
        ? ((coin.current_price / coin.bought_price) * 100).toFixed(1)
        : ((coin.bought_price / coin.current_price) * 100).toFixed(1)
    }%)`;
  };
  if (!coinsArr) {
    return <div>loading</div>;
  }
  return (
    <div>
      <div className="container max-w-5xl px-4 mx-auto sm:px-8">
        <h2 className="text-center pt-8 text-2xl text-gray-700 ">Contents of Your Farazy Wallet</h2>
        <div className="py-4">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 whitespace-nowrap"
                    >
                      {'Coin (Symbol)'}
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-end text-gray-800 uppercase bg-white border-b border-gray-200 whitespace-nowrap"
                    >
                      In Wallet
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-end text-gray-800 uppercase bg-white border-b border-gray-200 whitespace-nowrap"
                    >
                      Current
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-end text-gray-800 uppercase bg-white border-b border-gray-200 whitespace-nowrap"
                    >
                      You Bought
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 whitespace-nowrap text-center"
                    >
                      Gain/Loss
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coinsArr.map((coin, i) => (
                    <tr key={i}>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="flex items-center w-max h-max">
                          <div className="flex-shrink-0">
                            <a
                              href={`https://www.google.com/search?q=${coin.name}`}
                              target="_blank"
                              className="relative block mx-auto object-cover rounded-full h-7 w-7"
                              rel="noreferrer"
                            >
                              <Image
                                alt="Icon of the crypto currency"
                                src={coin.image}
                                fill={true}
                              />
                            </a>
                          </div>
                          <div className="ml-2">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {`${coin.name} (${coin.symbol.toUpperCase()})`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div>
                          <p className="text-gray-900 whitespace-no-wrap  text-end">
                            {`${coin.bought_amount} ${coin.symbol.toUpperCase()}`}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div>
                          <p className="text-gray-900 whitespace-no-wrap  text-end">
                            {formatCurrency(coin.current_price * coin.bought_amount)}
                          </p>
                          <p className="text-gray-500 whitespace-no-wrap text-end  text-xs">
                            {`= ${coin.bought_amount} ${coin.symbol.toUpperCase()}`}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="text-gray-900 whitespace-no-wrap">
                          <p className="text-gray-900 whitespace-no-wrap  text-end">
                            {formatCurrency(coin.bought_price * coin.bought_amount)}
                          </p>
                          <p className="text-gray-500 whitespace-no-wrap text-end  text-xs">
                            {`${formatCurrency(
                              coin.bought_price
                            )} per ${coin.symbol.toUpperCase()}`}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 whitespace-nowrap">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                          ></span>
                          <span className="relative">{calculateGainLoss(coin)}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
