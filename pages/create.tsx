import { useEffect, useState } from 'react';
import CreateWalletForm from '../components/CreateWalletForm/CreateWalletForm';
import { AllCoins } from '../components/types/CreateWalletTypes';

const Create = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [allCoins, setAllCoins] = useState<AllCoins[]>([]);
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/list')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div className=" flex flex-col items-center">
      <CreateWalletForm
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />
    </div>
  );
};

export default Create;
