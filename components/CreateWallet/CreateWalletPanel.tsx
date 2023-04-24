import React, { useEffect, useState } from 'react';
import { AddedCoinsList } from './AddedCoinsList';
import { Note } from './Note';
import { Title } from './Title';
import { TotalAmountCard } from './TotalAmountCard';
import { VsCurrency } from './VsCurrency';
import { SearchCoinDynamic } from './SearchCoinDynamic';
import { AddedCoin } from './types';

export const CreateWalletPanel = () => {
  const [currency, setCurrency] = useState('usd');
  const [vsCurrencies, setVsCurrencies] = useState(['usd']);
  const [allAddedCoins, setAllAddedCoins] = useState<AddedCoin[]>([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
      .then((response) => response.json())
      .then((data) => setVsCurrencies(data));
  }, []);

  return (
    <div className="max-w-5xl flex flex-col gap-3">
      <div className="flex justify-between">
        <Title />
        <TotalAmountCard currency={currency} amount={1000} />
      </div>
      <AddedCoinsList
        currency={currency}
        allAddedCoins={allAddedCoins}
        setAllAddedCoins={setAllAddedCoins}
      />
      <SearchCoinDynamic allAddedCoins={allAddedCoins} setAllAddedCoins={setAllAddedCoins} />
      <VsCurrency all_currencies={vsCurrencies} setCurrency={setCurrency} currency={currency} />
      <Note />
    </div>
  );
};
