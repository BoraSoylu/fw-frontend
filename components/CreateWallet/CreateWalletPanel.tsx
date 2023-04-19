import React, { useEffect, useState } from 'react';
import { AddCoinRow } from './AddCoinRow';
import { Note } from './Note';
import { Title } from './Title';
import { TotalAmountCard } from './TotalAmountCard';
import { VsCurrency } from './VsCurrency';

export const CreateWalletPanel = () => {
  const [currency, setCurrency] = useState('usd');
  const [vsCurrencies, setVsCurrencies] = useState(['usd']);
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
      <AddCoinRow currency={currency} />
      <VsCurrency all_currencies={vsCurrencies} setCurrency={setCurrency} currency={currency} />
      <Note />
    </div>
  );
};
