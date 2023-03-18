import React from 'react';

type CurrentCoin = {
  id: string;
  symbol: string;
  name: string;
  img: string;
  price: number;
  amount: number;
};

type CurrentWalletDisplayProps = {
  currentCoins: CurrentCoin[];
};

const CurrentWalletDisplay: React.FC<CurrentWalletDisplayProps> = ({ currentCoins }) => {
  const totalValue = currentCoins.reduce((acc, coin) => acc + coin.price * coin.amount, 0);

  return (
    <div className="container dark:bg-gray-800">
      <div className="flex justify-between w-full py-2 md:py-4">
        <span className="text-gray-800 dark:text-white font-bold text-lg md:text-xl">
          Current Wallet Value:
        </span>
        <span className="text-green-600 font-bold text-lg md:text-xl">{`$${totalValue.toFixed(
          2
        )}`}</span>
      </div>
    </div>
  );
};

export default CurrentWalletDisplay;
