import PostListing from "@/components/blogs/PostListing";
import { getAllPosts } from "@/logic/shared/blog-api"

export default async function BlogHome(){

    const posts = await getAllPosts();

    return (
    <div>
        <h1>Blogs</h1>

        <h2>Latest Posts</h2>
        <div className="grid grid-cols-2">
        { posts.map( post => (
            <div className="col-span-2 md:col-span-1">
                <PostListing key={post.id} post={post}/>
            </div>
        ))}
        </div>
    </div>
    )
}