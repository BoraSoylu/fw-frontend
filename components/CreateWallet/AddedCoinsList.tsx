import React, { useContext, useEffect, useState } from 'react';
import { SearchCoinDynamic } from './SearchCoinDynamic';
import { AddedCoin } from './types';
import { CoinRow } from './CoinRow';
import { ApiLimitReachedContext } from '../../context/ApiLimitModalContext';
export const AddedCoinsList = ({
  currency,
  allAddedCoins,
  setAllAddedCoins,
}: {
  currency: string;
  allAddedCoins: AddedCoin[];
  setAllAddedCoins: React.Dispatch<React.SetStateAction<AddedCoin[]>>;
}) => {
  const { apiLimitReached, setApiLimitReached } = useContext(ApiLimitReachedContext);

  useEffect(() => {
    console.log(
      `Made api call for current coin prices. Hopefully only when allAddedCoins.lenght changes.`
    );
    console.log(allAddedCoins.length);

    let coinIdString = '';
    for (let index = 0; index < allAddedCoins.length; index++) {
      coinIdString = `${coinIdString}${allAddedCoins[index].api_symbol}%2C`;
    }
    if (allAddedCoins.length !== 0) {
      try {
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
      } catch (error) {
        setApiLimitReached(true);
        console.log('Api limit reached');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAddedCoins.length, currency]);

  return (
    <div className="sm:px-8 container mx-auto w-full max-w-7xl">
      <div className="py-8">
        <div className="sm:-mx-8 sm:px-8 -mx-4 overflow-x-auto px-4 py-4">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    Coin
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    Current Price
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    Coin Amount
                  </th>
                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                  >
                    {`In ${currency}`}
                  </th>

                  <th
                    scope="col"
                    className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
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
