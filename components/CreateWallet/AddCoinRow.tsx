import React, { useState } from 'react';

export const AddCoinRow = ({ currency }: { currency: string }) => {
  return (
    <div className="flex gap-2 max-w-4xl">
      <div className=" relative ">
        <div className="absolute mt-2 ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="coin-name"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 pl-9 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="Coin Name"
        />
      </div>
      <div className=" relative flex items-center ">
        <input
          type="text"
          id="coin-name"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 pr-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="Amount"
        />
        <div className="absolute right-0 mr-2 ">{currency.toLocaleUpperCase()}</div>
      </div>
      <div className="self-center text-xl">=</div>
      <div className=" relative flex items-center ">
        <input
          type="text"
          id="coin-name"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 pr-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="Amount"
        />
        <div className="absolute right-0 mr-2 ">{currency.toLocaleUpperCase()}</div>
      </div>
      <button
        type="button"
        className="py-2 px-4 flex-1  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      >
        Add
      </button>
    </div>
  );
};
