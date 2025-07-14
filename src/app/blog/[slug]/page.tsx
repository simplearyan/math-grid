import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

import Calculator from "@/components/Calculator";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const prettyCodeOptions:PrettyCodeOptions = {
  theme: "github-dark",
  showLineNumbers: true,
  // Custom function to extract file name from meta
  onVisitLine(node) {
    // Ensure empty lines are rendered
    if (!node.children) node.children = [];
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties) node.properties = {};
    if (!Array.isArray(node.properties.className)) {
      node.properties.className = [];
    }
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    if (!node.properties) node.properties = {};
    node.properties.className = ["word"];
  },
};

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
             [rehypePrettyCode, prettyCodeOptions],
            ],
          },
        }}
      />
    </article>
  );
}
