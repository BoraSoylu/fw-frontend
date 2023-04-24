import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SearchCoinDynamic } from './SearchCoinDynamic';
export const AddCoinRow = ({ currency }: { currency: string }) => {
  // useEffect(() => {
  //   if (selectedCoin.api_id !== '') {
  //     fetch(
  //       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${selectedCoin.api_id}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en
  //       `
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setExchangeRate(data[0].current_price);
  //       });
  //   }
  // }, [selectedCoin, currency]);

  return (
    <div className="flex gap-2">
      <div className=" relative ">
        <SearchCoinDynamic />
      </div>

      <div className=" relative ">
        <input
          type="text"
          id="coin-amount"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="Amount"
        />
      </div>

      <div className=" relative ">
        <input
          type="text"
          id="amount-in-vs"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="Amount"
        />
      </div>
    </div>
  );
};
