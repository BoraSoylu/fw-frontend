import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Image from 'next/image';

type Item = {
  id: number;
  name: string;
  icon: string;
  api_id: string;
  symbol: string;
};
type ApiItem = {
  api_symbol: string;
  id: string;
  large: string;
  name: string;
  symbol: string;
  thumb: string;
  market_cap_rank: number;
};

export const AddCoinRow = ({ currency }: { currency: string }) => {
  const [coins, setCoins] = useState<Item[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Item>({
    id: 0,
    name: '',
    icon: '',
    api_id: '',
    symbol: '',
  });
  const [exchangeRate, setExchangeRate] = useState();
  const [coinAmount, setCoinAmount] = useState<string | number>('');
  const [coinAmountInVs, setCoinAmountInVs] = useState<string | number>('');
  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/search?query=`)
      .then((response) => response.json())
      .then((data) => {
        const mappedCoins = data.coins.map((coin: ApiItem, index: Number) => ({
          id: index,
          name: coin.name,
          icon: coin.large,
          api_id: coin.id,
          symbol: coin.symbol,
        }));
        setCoins(mappedCoins);
      });
  }, []);

  const handleOnSearch = (string: string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
  };

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result);
  };

  const handleOnSelect = (item: Item) => {
    // the item selected
    setSelectedCoin(item);
  };
  useEffect(() => {
    if (selectedCoin.api_id !== '') {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${selectedCoin.api_id}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en
        `
      )
        .then((response) => response.json())
        .then((data) => {
          setExchangeRate(data[0].current_price);
        });
    }
  }, [selectedCoin, currency]);

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item: Item) => {
    return (
      <div className="flex items-center gap-2">
        <Image src={item.icon} alt={`Icon of ${item.name}`} width={30} height={30} />
        <span className="">{item.name}</span>
      </div>
    );
  };

  const handleChangeCoinAmount = (event) => {
    const amount = event.target.value;
    setCoinAmount(amount);
    setCoinAmountInVs(amount * exchangeRate);
  };

  const handleChangeCoinAmountInVs = (event) => {
    const amount = event.target.value;
    setCoinAmountInVs(amount);
    setCoinAmount(amount / exchangeRate);
  };

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
        {/* <input
          type="text"
          id="coin-name"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 pl-9 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder="Coin Name"
          onChange={handleCoinNameChange}
          autoComplete="off"
        /> */}
        <div className="w-fit min-w-[400px] text-red-600" style={{}}>
          {/* {selectedCoin.icon === '' ? (
            <></>
          ) : (
            <Image
              src={selectedCoin.icon}
              alt={`Icon of ${selectedCoin.name}`}
              width={30}
              height={30}
            />
          )} */}
          <ReactSearchAutocomplete
            items={coins}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            formatResult={formatResult}
            // showItemsOnFocus={true}
            maxResults={6}
            showIcon={false}
            placeholder="Coin Name"
          />
        </div>
      </div>
      <div className=" relative flex items-center ">
        <input
          type="text"
          id="coin-amount"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 pr-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder={selectedCoin.api_id === '' ? 'Amount' : '1'}
          autoComplete="off"
          value={coinAmount}
          onChange={handleChangeCoinAmount}
        />
        <div className="absolute right-0 mr-2 ">{selectedCoin.symbol}</div>
      </div>
      <div className="self-center text-xl">=</div>
      <div className=" relative flex items-center ">
        <input
          type="text"
          id="coin-amount-in-vs"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 pr-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          placeholder={selectedCoin.api_id === '' ? 'Amount' : `${exchangeRate}`}
          autoComplete="off"
          value={coinAmountInVs}
          onChange={handleChangeCoinAmountInVs}
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
