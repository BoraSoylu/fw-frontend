import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WalletFormData, WalletFormDataType } from '../components/types/WalletFormDisplay';
import ViewWalletFrom from '../components/ViewWalletForm/ViewWalletFrom';
import useSWR from 'swr';
const fetcher = (url: any) => fetch(url).then((res) => res.json());

const WalletView = () => {
  const router = useRouter();
  const { address } = router.query;
  const [walletData, setWalletData] = useState<WalletFormDataType | undefined>(undefined);
  const { data, error } = useSWR(
    'https://www.farazywallet.com/api/v1/wallet?address=BG596TCG57',
    fetcher
  );
  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';
  return (
    <>
      <ViewWalletFrom walletData={data} />
    </>
  );
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {s}

export default WalletView;
