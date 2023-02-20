import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { AllCoins, coinImages } from '../types/CreateWalletTypes';
import Image from 'next/image';

type Item = {
  id: number;
  name: string;
  coinId: string;
};

export const CoinSearchBox = ({ allCoins }: { allCoins: AllCoins[] }) => {
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item: Item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    );
  };

  return (
    <div>
      <ReactSearchAutocomplete
        items={allCoins.map((coin, index) => ({
          id: index,
          name: coin.name,
          coinId: coin.id,
        }))}
        formatResult={formatResult}
        styling={{ borderRadius: '0.5rem' }}
      />
    </div>
  );
};
