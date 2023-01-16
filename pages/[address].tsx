import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { type } from 'os';
import useSWR from 'swr';
import ViewWalletFrom from '../components/ViewWalletForm/ViewWalletFrom';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Post = ({ walletData }: any) => {
  const router = useRouter();
  if (walletData instanceof Error) {
    return <div>{walletData.message}</div>;
  } else {
    return (
      <div>
        <ViewWalletFrom walletData={walletData} />
      </div>
    );
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const address = context.params?.address;
    if (typeof address !== 'string' || !/^[123456789ABCDEFGHJKLMNPRSTUVWXYZ]{10}$/.test(address)) {
      throw Error('Invalid Address parameter!');
    }
    const res = await fetch(`https://www.farazywallet.com/api/v1/wallet?address=${address}`);
    const walletData = await res.json();

    return {
      props: { walletData }, // will be passed to the page component as props
    };
  } catch (error) {
    const walletData = error;
    return {
      props: { walletData }, // will be passed to the page component as props
    };
  }
}

export default Post;
