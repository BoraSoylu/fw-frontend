import React, { useState } from 'react';
import { AddedCoin } from './types';
import Image from 'next/image';

export const CoinRow = ({
  coin,
  currency,
  allAddedCoins,
  setAllAddedCoins,
}: {
  coin: AddedCoin;
  currency: string;
  allAddedCoins: AddedCoin[];
  setAllAddedCoins: React.Dispatch<React.SetStateAction<AddedCoin[]>>;
}) => {
  const [amount, setAmount] = useState('');
  const [vsAmount, setVsAmount] = useState('');

  const handleAmountChange = (event: React.FormEvent<HTMLInputElement> | any) => {
    const regex = /^[0-9.]*$/; // Regular expression to match only numbers and dots
    if (!regex.test(event.target.value)) {
      return;
    }
    setAmount(event.target.value);
    setVsAmount((Number(event.target.value) * coin.price).toString());

    for (let index = 0; index < allAddedCoins.length; index++) {
      if (allAddedCoins[index].api_symbol === coin.api_symbol) {
        allAddedCoins[index].amount = event.currentTarget.value;
      }
    }
    setAllAddedCoins(allAddedCoins);
    console.log(allAddedCoins);
  };
  const handleVsAmountChange = (event: React.FormEvent<HTMLInputElement> | any) => {
    const regex = /^[0-9.]*$/; // Regular expression to match only numbers and dots
    if (!regex.test(event.target.value)) {
      return;
    }
    setAmount((Number(event.target.value) / coin.price).toString());
    setVsAmount(event.target.value);

    for (let index = 0; index < allAddedCoins.length; index++) {
      if (allAddedCoins[index].api_symbol === coin.api_symbol) {
        allAddedCoins[index].amount = (Number(event.currentTarget.value) / coin.price).toString();
      }
    }
    setAllAddedCoins(allAddedCoins);
    console.log(allAddedCoins);
  };
  return (
    <tr>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a
              rel="noopener noreferrer"
              href={`https://www.coingecko.com/en/coins/${coin.api_symbol}`}
              className="relative block"
              target="_blank"
            >
              <Image
                src={coin.icon}
                alt={`Icon of ${coin.name}`}
                width={50}
                height={50}
                className="mx-auto h-10 w-10 rounded-full object-cover "
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="whitespace-no-wrap text-gray-900">{coin.name}</p>
          </div>
        </div>
      </td>
      <td className="min-w-fit border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <span className="relative inline-block min-w-fit px-3 py-1  text-right font-semibold">
          <span className="relative  min-w-fit whitespace-nowrap text-right">
            {`1 ${coin.symbol}`} <br /> {`= ${coin.price} ${currency}`}
          </span>
        </span>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className=" relative ">
          <input
            type="text"
            id="coin-amount"
            className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Amount"
            onChange={handleAmountChange}
            value={amount}
          />
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className=" relative ">
          <input
            type="text"
            id="amount-in-vs"
            className=" w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Amount"
            onChange={handleVsAmountChange}
            value={vsAmount}
          />
        </div>
      </td>

      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-lg  bg-red-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  focus:ring-offset-red-200 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
