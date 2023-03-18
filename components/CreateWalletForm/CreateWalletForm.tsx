import React, { Dispatch, SetStateAction } from 'react';
import { AllCoins, coinImages } from '../types/CreateWalletTypes';
import { CoinSearchBox } from './CoinSearchBox';

export default function CreateWalletForm({
  selectedCurrency,
  setSelectedCurrency,
  allCoins,
  loading,
}: {
  selectedCurrency: string;
  setSelectedCurrency: Dispatch<SetStateAction<string>>;
  allCoins: AllCoins[];
  loading: boolean;
}) {
  if (loading) return <div>loading</div>;
  return (
    <div className="container dark:bg-gray-800 p-3 rounded-xl">
      <form className="flex flex-col justify-center w-fit space-y-3 md:flex-row md:space-x-3 md:space-y-0">
        <div className="relative w-64">
          <CoinSearchBox allCoins={allCoins} />
        </div>
        <div className="relative w-64">
          <input
            type="text"
            id="form-create-wallet"
            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Amount"
          />
        </div>
        <div className="relative w-64">
          <input
            type="text"
            id="form-create-wallet"
            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder={`In ${selectedCurrency.toUpperCase()}`}
          />
        </div>
        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
          Add
        </button>
      </form>
    </div>
  );
}
