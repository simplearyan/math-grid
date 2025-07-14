import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkPrism from 'remark-prism';

// Define the shape of the front matter data
export interface PostData {
  id: string;
  contentHtml: string;
  [key: string]: any; // For additional metadata fields
}

const postsDirectory = path.join(process.cwd(), 'posts');

// ... (getSortedPostsData and getAllPostIds remain the same) ...

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(remarkPrism, {
      plugins: [
        'line-numbers',
        'show-language',
        'copy-to-clipboard',
        // Add more Prism.js plugins as needed
      ],
    })
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
