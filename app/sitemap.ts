import { staticPages, WebPage } from "@/data/pages";
import { getAllPosts } from "@/logic/shared/blog-api";
import { Metadata, MetadataRoute } from "next";

const BASE_URL = "https://custommade.games";
const SITEMAP_URL_LIMIT = 50_000;


export async function getAllPages(){
    const blogPosts: WebPage[] = (await getAllPosts())
        .map( post => (
            {
                path: post.url,
                lastEdited: new Date(post.updatedDate ?? post.publishedDate)
            }
        ))

    return blogPosts.concat(staticPages);
}

export async function generateSitemaps(){
    const webPages = await getAllPages();
    const sitemapCount = Math.ceil(webPages.length / SITEMAP_URL_LIMIT)
    return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }))
}

export default async function sitemap(props: {
    id: Promise<number>,
}): Promise<MetadataRoute.Sitemap> {
    const id = await props.id;
    const webPages = await getAllPages();
    
    const start = id * SITEMAP_URL_LIMIT;
    const end = start + SITEMAP_URL_LIMIT;
    return webPages.slice(start,end).map((page) => (
        {
            url: `${BASE_URL}${page.path}`,
            lastModified: page.lastEdited,
            changeFrequency: "weekly",
            priority: 0.7
        }
    ))
}