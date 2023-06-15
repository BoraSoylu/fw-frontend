import React from 'react';

export const CreateWalletHero = () => {
  return (
    <div className="flex max-w-7xl flex-col gap-2">
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">Create a new wallet!</h1>
      <h2 className="text-md max-w-4xl text-gray-500">
        Add coins to your wallet and track their value over time. After adding coins to your wallet
        you will receive a unique link to your wallet that you can share with others or just save
        for yourself. Just remember that all wallets are public and anyone with the link can view
        your wallet so try not to include anything personal. You will the address after creating the
        wallet.
      </h2>
    </div>
  );
};
