import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { type } from 'os';
import useSWR from 'swr';
import ViewWalletFrom from '../components/ViewWalletForm/ViewWalletFrom';
import { WalletFormData, SingleCoin } from '../components/types/WalletFormDisplay';
import { json } from 'stream/consumers';

const mockApiCall = {
  address: '7RY9WGJWFX',
  title: 'test title',
  note: 'test note',
  createdAt: '2023-01-10T09:23:18.240Z',
  contents: {
    coin_0: { id: 'coinId_0', name: 'coinName_0', price: 0.1, amount: 0.1, symbol: 'asdasdasd' },
    coin_1: { id: 'coinId_1', name: 'coinName_1', price: 1, amount: 1, symbol: 'coinSymbol_1' },
    coin_2: { id: 'coinId_2', name: 'coinName_2', price: 2, amount: 2, symbol: 'coinSymbol_2' },
    coin_3: { id: 'coinId_3', name: 'coinName_3', price: 3, amount: 3, symbol: 'coinSymbol_3' },
    coin_4: { id: 'coinId_4', name: 'coinName_4', price: 4, amount: 4, symbol: 'coinSymbol_4' },
    coin_5: { id: 'coinId_5', name: 'coinName_5', price: 5, amount: 5, symbol: 'coinSymbol_5' },
    coin_6: { id: 'coinId_6', name: 'coinName_6', price: 6, amount: 6, symbol: 'coinSymbol_6' },
  },
};

const WalletView = () => {
  const router = useRouter();
  const { address } = router.query;

  // ****** Mock fw api getWallet response ******
  const contentsArray = []
  
  const walletData: WalletFormData = {
    title: mockApiCall.title,
    note: mockApiCall.note,
    address: mockApiCall.address,
    createdAt: new Date(mockApiCall.createdAt),
  };
  // ****** Mock fw api getWallet response ******

  // ****** Fixed fw api wallet response ******
  const fixedURL = 'https://www.farazywallet.com/api/v1/wallet?address=7RY9WGJWFX';
  fetch(fixedURL).then((response) => console.log(response));
  // ****** Fixed fw api wallet response *****

  if (walletData instanceof Error) {
    return <div>{walletData.message}</div>;
  } else {
    return (
      <>
        <p>Address is: {address}</p>
        <ViewWalletFrom walletData={} />
      </>
    );
  }
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {s}

export default WalletView;
