import React, { useEffect, useState } from 'react';
import { SearchCoinDynamic } from './SearchCoinDynamic';
import { AddedCoin } from './types';
import { CoinRow } from './CoinRow';
export const AddedCoinsList = ({
  currency,
  allAddedCoins,
  setAllAddedCoins,
}: {
  currency: string;
  allAddedCoins: AddedCoin[];
  setAllAddedCoins: React.Dispatch<React.SetStateAction<AddedCoin[]>>;
}) => {
  useEffect(() => {
    console.log(
      'Made api call for current coin prices. Hopefully only when allAddedCoins.lenght changes.'
    );
    let coinIdString = '';
    for (let index = 0; index < allAddedCoins.length; index++) {
      coinIdString = `${coinIdString}${allAddedCoins[index].api_symbol}%2C`;
    }
    if (allAddedCoins.length !== 0) {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?ids=${coinIdString}&vs_currency=${currency}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAllAddedCoins(
            allAddedCoins.map((coin) => ({
              ...coin,
              price: data.find((apiCoin: any) => apiCoin.id === coin.api_symbol).current_price,
            }))
          );
          console.log(allAddedCoins);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAddedCoins.length, currency]);

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Coin
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Current Price
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Coin Amount
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    {`In ${currency}`}
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {allAddedCoins.map((coin, index) => (
                  <CoinRow
                    key={index}
                    coin={coin}
                    currency={currency}
                    allAddedCoins={allAddedCoins}
                    setAllAddedCoins={setAllAddedCoins}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
