import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { address } = router.query

  return <p>Post: {address}</p>
}

export default Post
