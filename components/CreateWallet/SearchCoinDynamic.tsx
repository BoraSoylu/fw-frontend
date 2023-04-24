import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import Image from 'next/image';
type CoinApiReturn = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

export const SearchCoinDynamic = () => {
  const [displayItems, setDisplayItems] = useState<CoinApiReturn[]>();
  const displayItemsCount = 5;

  // Get top 5 coins on page load
  useEffect(() => {
    const initialFetch = async () => {
      setDisplayItems(await search(''));
    };
    initialFetch();
  }, []);

  // Search coingecko for user input
  async function search(currentCoinInput: string) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${currentCoinInput}`
    );
    const body = await response.json();

    return body.coins.slice(0, displayItemsCount);
  }

  // Debounce and set coins to display
  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      setDisplayItems(await search(criteria));
    }, 1000)
  ).current;

  // Call debounce
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle input change
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
  }
  //

  const moveFocusDown = () => {
    const listItems = document.querySelector('#unordered-list').childNodes;

    const activeItem = document.activeElement;

    for (let i = 0; i < listItems.length; i++) {
      const listLength = listItems.length;
      if (activeItem === listItems[i] && activeItem !== listItems[listLength - 1]) {
      } else if (activeItem === document.querySelector('#coin-name')) {
        console.log(typeof listItems[0]);

        (listItems[0] as HTMLElement)?.focus();
      }
    }
  };
  const moveFocusUp = () => {
    const listItems = document.querySelector('#menu').childNodes;
    const activeItem = document.activeElement;
    for (let i = 0; i < listItems.length; i++) {
      if (activeItem === listItems[i] && activeItem !== listItems[0]) {
        listItems[i - 1].focus();
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      moveFocusDown();
    }
    if (e.key === 'ArrowUp') {
      moveFocusUp();
    }
  };

  return (
    <div className=" w-full ">
      <input
        type="search"
        id="coin-name"
        className="text-xl rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
        placeholder="Coin Name"
        onChange={handleChange}
        autoComplete="off"
        onKeyDown={handleKeyDown}
      />
      {displayItems === undefined ? (
        <></>
      ) : (
        <ul
          id="unordered-list"
          className="text-xl rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2  bg-white text-gray-700 placeholder-gray-400 shadow-sm  focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent mt-2"
        >
          {displayItems.map((coin) => (
            <li
              className="px-2 flex gap-2 py-1 rounded mx-1 max-w-full hover:bg-slate-300 hover:cursor-pointer focus:bg-slate-300"
              key={coin.id}
            >
              <Image src={coin.large} alt={`Icon of ${coin.name}`} width={30} height={30} />
              {coin.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
