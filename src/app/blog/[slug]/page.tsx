import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

import Calculator from "@/components/Calculator";

// export const runtime = 'edge';
export const dynamicParams = false; // Essential for static exports in dynamic routes

import { getSortedPostsData, getBlogPostData, PostMeta } from '@/lib/blog-data';

// This function runs at build time to pre-render pages
export async function generateStaticParams() {
const posts: PostMeta[] = getSortedPostsData(); // This returns [{ slug: '...' }, { slug: '...' }]
  return posts.map((post) => ({ slug: post.slug })); // Correctly map to [{ slug: '...' }] format
}

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
  };
  content: string;
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>; // params is now a Promise that resolves to { slug: string }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postData = await getBlogPostData(slug);

  if (!postData) {
    return <div>Post not found!</div>;
  }

  const { frontmatter, content } = postData as BlogPost;
  return (
 <article className="prose dark:prose-invert prose-lg md:prose-xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 rounded-xl shadow-md transition-colors duration-300 max-w-2xl lg:max-w-3xl ">
      <header className="mb-8 border-b pb-4">
        <h1 className="mb-2 text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white">
          {frontmatter.title}
        </h1>
        {frontmatter.description && (
          <p className="text-zinc-600 dark:text-zinc-300 text-lg">
            {frontmatter.description}
          </p>
        )}
      </header>
      <MDXRemote
        source={content}
        components={{ Calculator }}
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "github-dark",
                  showLineNumbers: true,
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
