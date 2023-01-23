import { useEffect, useState } from 'react';
import {
  WalletFormDataType,
  CoinDetailsViewType,
  WalletContentsType,
} from '../types/WalletFormDisplay';
import { CoinsSlashMarkets } from '../types/CoinGeckoTypes';
import Image from 'next/image';

export default function ViewWalletFrom({ walletData }: { walletData: WalletFormDataType }) {
  const [vsCurrencies, setVsCurrencies] = useState('usd');
  const [coinsArr, setCoinsArr] = useState<CoinsSlashMarkets[] | undefined>();

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

    fetch(CoinsSlashMarketsURL)
      .then((response) => response.json())
      .then((data) => setCoinsArr(data));
  }, []);
  if (!coinsArr) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div className="container max-w-3xl px-4 mx-auto sm:px-8">
        <h2 className="text-center pt-8 text-2xl text-gray-700 ">Contents of Your Farazy Wallet</h2>
        <div className="py-4">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      {'Coin (Symbol)'}
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-end text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Current
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-end text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Bought
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Gain/Loss
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coinsArr.map((coin, i) => (
                    <tr key={i}>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                              <Image
                                src={coin.image}
                                alt="Picture of the crypto currency"
                                width={500}
                                height={500}
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {`${coin.name} (${coin.symbol.toUpperCase()})`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div>
                          <p className="text-gray-900 whitespace-no-wrap  text-end">{'$123456'}</p>
                          <p className="text-gray-500 whitespace-no-wrap text-end  text-xs">
                            {`= 1,00 ${coin.symbol.toUpperCase()}`}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="text-gray-900 whitespace-no-wrap">
                          <p className="text-gray-900 whitespace-no-wrap  text-end">
                            {`$${coin.price}`}
                          </p>
                          <p className="text-gray-500 whitespace-no-wrap text-end  text-xs">
                            {`= ${coin.amount} ${coin.symbol.toUpperCase()}`}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                          ></span>
                          <span className="relative">{coin.amount}$</span>
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
