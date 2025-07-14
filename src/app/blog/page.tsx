import Link from "next/link";
import { getSortedPostsData, PostMeta } from "@/lib/blog-data";

export const runtime = 'edge'; // <--- Add this line here

export default async function BlogPage() {
  const posts: PostMeta[] = getSortedPostsData();

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