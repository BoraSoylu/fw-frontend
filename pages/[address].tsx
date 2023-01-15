import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Post = ({ walletData }: any) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR('/api/user/123', fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const { address } = router.query;
  console.log(data);
  return <p>Post: {address}</p>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const address = context.params?.address;
  const res = await fetch(`https://www.farazywallet.com/api/v1/wallet?address=${address}`);
  const walletData = await res.json();

  return {
    props: { walletData }, // will be passed to the page component as props
  };
}

export default Post;
