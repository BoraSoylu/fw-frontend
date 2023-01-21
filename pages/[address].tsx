import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WalletFormData, WalletFormDataType } from '../components/types/WalletFormDisplay';
import ViewWalletFrom from '../components/ViewWalletForm/ViewWalletFrom';
const mockApiCall = {
  address: 'LDA326JKNR',
  title: 'test yht',
  note: 'aaaaaaaaaaaaa',
  createdAt: '2023-01-21T11:58:25.142Z',
  contents: {
    coin_0: {
      id: 'bitcoin',
      name: 'Bitcoin',
      price: 3000,
      amount: 2,
      symbol: 'btc',
    },
    coin_1: {
      id: 'ethereum',
      name: 'Ethereum',
      price: 2000,
      amount: 4,
      symbol: 'eth',
    },
    coin_2: {
      id: 'dogecoin',
      name: 'Dogecoin',
      price: 1,
      amount: 1,
      symbol: 'doge',
    },
    coin_3: {
      id: 'terra-luna',
      name: 'Terra Luna Classic',
      price: 0.00001,
      amount: 1000000,
      symbol: 'lunc',
    },
  },
};

const WalletView = () => {
  const router = useRouter();
  const { address } = router.query;
  const [walletData, setWalletData] = useState<WalletFormDataType | undefined>(undefined);

  // ****** Mock fw api getWallet response ******

  // ****** Mock fw api getWallet response ******
  // ****** Fixed fw api wallet response ******
  useEffect(() => {
    // const fixedURL = 'https://www.farazywallet.com/api/v1/wallet?address=LDA326JKNR';
    // fetch(fixedURL)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setWalletData(WalletFormData.parse  (mockApiCall));
  }, []);
  // ****** Fixed fw api wallet response *****

  if (walletData) {
    return (
      <>
        <p>Address is: {address}</p>
        <ViewWalletFrom walletData={walletData} />
      </>
    );
  } else {
    return <div>could not get wallet</div>;
  }
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {s}

export default WalletView;
