import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { type } from 'os';
import useSWR from 'swr';
import ViewWalletFrom from '../components/ViewWalletForm/ViewWalletFrom';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const WalletView = ({ walletData }: any) => {
  const router = useRouter();
  const { address } = router.query;
  if (walletData instanceof Error) {
    return <div>{walletData.message}</div>;
  } else {
    return (
      <>
        <p>Address is: {address}</p>
        <ViewWalletFrom />
      </>
    );
  }
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {s}

export default WalletView;
