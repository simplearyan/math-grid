import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

import Calculator from "@/components/Calculator";

interface BlogPostPageProps {
   params: Promise<{ slug: string }>; // params is now a Promise
}



export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "posts", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return notFound();

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return (
    <article className="prose dark:prose-invert prose-lg md:prose-xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 rounded-xl shadow-md transition-colors duration-300 max-w-2xl lg:max-w-3xl ">
      <header className="mb-8 border-b pb-4">
        <h1 className="mb-2 text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white">
          {data.title}
        </h1>
        {data.description && (
          <p className="text-zinc-600 dark:text-zinc-300 text-lg">
            {data.description}
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
                  showLineNumbers: true, // Enable line numbers
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
