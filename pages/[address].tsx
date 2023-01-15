import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { address } = router.query;

  return <p>Post: {address}</p>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`https://www.farazywallet.com/wallet?address=${context.params.address}`);
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Post;
