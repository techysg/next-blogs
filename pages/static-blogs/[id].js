
import { useRouter } from 'next/router'
import SinglePost from '../../components/single-post';

//Execution on server // it run on build time
export async function getStaticProps({ params: query }) {
    const { id } = query;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = await res.json()
    return {
        revalidate: 10,
        props: {
            post
        }
    }
}

export const getStaticPaths = async () => {
    return {
        paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
        fallback: true
    }
}

function Blog(props) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading....</div>
    }

    console.log({ props, router });

    return <div>
        <SinglePost key={post.id} post={props.post}/>
    </div>
}

export default Blog;

