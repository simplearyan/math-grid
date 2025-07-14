import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getBlogPostData(slug?: string) {
    const blogDirectory = path.join(process.cwd(), 'posts'); // Adjust this path to your blog content

    if (slug) {
        // Read a single blog post
        const fullPath = path.join(blogDirectory, `${slug}.md`); // Assuming markdown files
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        return { slug, frontmatter: data, content };
    } else {
        // Read all blog posts
        const fileNames = fs.readdirSync(blogDirectory);
        const posts = fileNames.map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(blogDirectory, `${slug}.md`);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data: frontmatter } = matter(fileContents);
            return { slug, frontmatter };
        });
        return posts;
    }
}