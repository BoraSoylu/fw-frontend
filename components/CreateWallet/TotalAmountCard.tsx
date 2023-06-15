import React from 'react';
import { AddedCoin } from './types';

export const TotalAmountCard = ({
  currency,
  allAddedCoins,
}: {
  currency: string;
  allAddedCoins: AddedCoin[];
}) => {
  const amount = allAddedCoins.reduce((acc, coin) => {
    if (!coin.amount || !coin.price) {
      return 0;
    }
    return acc + coin.amount * coin.price;
  }, 0);
  return (
    <div className="">
      <div className="h-34 w-36 rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg>

          <p className="text-md ml-2 text-black dark:text-white">Total</p>
        </div>
        <div className="flex flex-col justify-start">
          <p className="my-4 text-left text-4xl font-bold text-gray-700 dark:text-gray-100">
            {amount ? 0 : amount.toFixed(2)}
            <span className="text-sm">{currency}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
