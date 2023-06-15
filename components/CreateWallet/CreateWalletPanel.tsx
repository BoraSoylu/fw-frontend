import React, { useContext, useEffect, useState } from 'react';
import { AddedCoinsList } from './AddedCoinsList';
import { Note } from './Note';
import { Title } from './Title';
import { TotalAmountCard } from './TotalAmountCard';
import { VsCurrency } from './VsCurrency';
import { SearchCoinDynamic } from './SearchCoinDynamic';
import { AddedCoin } from './types';
import { CreateWalletHero } from './CreateWalletHero';
import { CoinRow } from './CoinRow';
import { ApiLimitReachedContext } from '../../context/ApiLimitModalContext';

export const CreateWalletPanel = () => {
  const [currency, setCurrency] = useState('usd');
  const [vsCurrencies, setVsCurrencies] = useState(['usd']);
  const [allAddedCoins, setAllAddedCoins] = useState<AddedCoin[]>([]);
  const { apiLimitReached, setApiLimitReached } = useContext(ApiLimitReachedContext);

  useEffect(() => {
    try {
      fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
        .then((response) => response.json())
        .then((data) => setVsCurrencies(data));
    } catch (error) {
      setApiLimitReached(true);
      console.log('Api limit reached');
    }
  }, []);

  return (
    <div className="mx-auto flex h-full w-fit max-w-7xl flex-1 flex-col gap-11 px-8">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <div className="md:mr-52">
          <CreateWalletHero />
        </div>
        <div>
          <div>
            <TotalAmountCard currency={currency} allAddedCoins={allAddedCoins} />
          </div>

          <div className="md:pr-24">
            <SearchCoinDynamic allAddedCoins={allAddedCoins} setAllAddedCoins={setAllAddedCoins} />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Title />
        </div>
        <AddedCoinsList
          allAddedCoins={allAddedCoins}
          setAllAddedCoins={setAllAddedCoins}
          currency={currency}
        />
      </div>
    </div>
  );
};
