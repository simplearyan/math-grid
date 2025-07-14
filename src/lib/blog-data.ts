import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
    title: string;
    description: string;
    slug: string;
}

export function getSortedPostsData(): PostMeta[] {
    const postsDirectory = path.join(process.cwd(), "posts");
    const files = fs.readdirSync(postsDirectory);

    const allPostsData: PostMeta[] = files
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

    // You might want to sort posts by date or title here
    return allPostsData.sort((a, b) => (a.title > b.title ? 1 : -1));
}

// You'll also need a function to get a single post's data for dynamic routes
export function getBlogPostData(slug: string) {
    const postsDirectory = path.join(process.cwd(), "posts");

    // Try both .mdx and .md extensions
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);

    let filePath: string | null = null;
    if (fs.existsSync(mdxPath)) {
        filePath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
        filePath = mdPath;
    }

    if (!filePath) {
        throw new Error(`Blog post file not found for slug: ${slug}`);
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
        frontmatter: data as { title: string; description?: string },
        content,
    };
}