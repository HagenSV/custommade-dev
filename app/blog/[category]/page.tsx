import PostListing from "@/components/blogs/PostListing";
import StyledLink from "@/components/core/StyledLink";
import { getAllPosts, getAllPostsByCategory, getPostById, getPostCategories } from "@/logic/shared/blog-api";
import { Metadata, ResolvingMetadata } from "next";
import { useMemo } from "react";

type Props = {
    params: Promise<{category: string}>
}

export async function generateStaticParams(){
  const posts = await getPostCategories();
  return posts.map((category) => ({
    category
  }))
}

export async function generateMetaData(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { category } = await params

    return {
        title: category + "Blog",
        description: "",
    }
}

export default async function PostPage({ params }: Props) {
  
  const { category } = await params;
  const posts = await getAllPostsByCategory(category);

  const formattedCategory = category
      .split("-")
      .map(s => s.substring(0,1).toUpperCase() + s.substring(1))
      .join(" ")

  return (
    <div>
      <h1>{formattedCategory} Blog</h1>
        <div className="col-span-2">
        { posts.map( post =>
          <div className="col-span-2 md:col-span-1">
            <PostListing key={post.id} post={post} />
          </div>
        ) }
        </div>
        { posts.length == 0 && <p>There are no posts in this category, check back later!</p> }
    </div>
   
  );
}