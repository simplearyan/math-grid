import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

interface PostMeta {
  title: string;
  description: string;
  slug: string;
}

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDirectory);

  const posts: PostMeta[] = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      return {
        title: data.title ?? slug,
        description: data.description ?? "",
        slug,
      };
    });

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
