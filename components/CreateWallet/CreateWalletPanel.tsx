import React, { useState } from 'react';
import { AddCoinRow } from './AddCoinRow';
import { Note } from './Note';
import { Title } from './Title';
import { TotalAmountCard } from './TotalAmountCard';
import { VsCurrency } from './VsCurrency';

export const CreateWalletPanel = () => {
  const [currency, setCurrency] = useState('usd');
  return (
    <div className="max-w-5xl flex flex-col gap-3">
      <TotalAmountCard currency={currency} amount={1000} />
      <Title />
      <VsCurrency all_currencies={['usd', 'eur', 'try', 'asd']} setCurrency={setCurrency} />
      <AddCoinRow currency={currency} />
      <Note />
    </div>
  );
};
