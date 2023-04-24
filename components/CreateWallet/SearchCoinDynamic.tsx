import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Image from 'next/image';
import { AddedCoin } from './types';
type CoinApiReturn = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

type Item = {
  id: number;
  name: string;
  icon: string;
  api_symbol: string;
  symbol: string;
  api_id: string;
};

export const SearchCoinDynamic = ({
  allAddedCoins,
  setAllAddedCoins,
}: {
  allAddedCoins: AddedCoin[];
  setAllAddedCoins: React.Dispatch<React.SetStateAction<AddedCoin[]>>;
}) => {
  const [displayItems, setDisplayItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const displayItemsCount = 5;

  useEffect(() => {
    const loadInitialCoins = async () => {
      const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${''}`);
      const body = await response.json();
      setDisplayItems(
        body.coins.slice(0, displayItemsCount).map((coin: CoinApiReturn, index: Number) => ({
          id: index,
          name: coin.name,
          icon: coin.large,
          api_symbol: coin.id,
          symbol: coin.symbol,
          api_id: coin.id,
        }))
      );
      setLoading(false);
    };
    loadInitialCoins();
  }, []);

  // Search coingecko for user input
  async function search(currentCoinInput: string) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${currentCoinInput}`
    );
    const body = await response.json();
    const mappedCoins = body.coins.map((coin: CoinApiReturn, index: Number) => ({
      id: index,
      name: coin.name,
      icon: coin.large,
      api_symbol: coin.id,
      symbol: coin.symbol,
      api_id: coin.id,
    }));
    return mappedCoins;
  }

  const handleOnSearch = async (string: string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setDisplayItems(await search(string));
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item: Item) => {
    let coinAlreadyAdded = false;
    for (let index = 0; index < allAddedCoins.length; index++) {
      if (allAddedCoins[index].api_symbol === item.api_symbol) {
        coinAlreadyAdded = true;
      }
    }
    if (coinAlreadyAdded === false) {
      const newCoin: AddedCoin = {
        amount: undefined,
        api_symbol: item.api_symbol,
        icon: item.icon,
        id: item.api_id,
        name: item.name,
        price: undefined,
        symbol: item.symbol,
      };
      setAllAddedCoins((current) => [...current, newCoin]);
    }
    console.log(allAddedCoins);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item: Item) => {
    return (
      <>
        <div className="flex items-center gap-2">
          <Image src={item.icon} alt={`Icon of ${item.name}`} width={30} height={30} />
          <span className="">{item.name}</span>
        </div>
      </>
    );
  };
  if (loading) return <></>;
  return (
    <div style={{ width: 400 }}>
      <ReactSearchAutocomplete
        items={displayItems}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        maxResults={5}
        formatResult={formatResult}
        showItemsOnFocus={true}
        inputDebounce={600}
        placeholder="Coin Name"
      />
    </div>
  );
};
