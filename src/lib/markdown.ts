import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight'; // For code highlighting
import remarkGfm from 'remark-gfm';           // For GitHub Flavored Markdown (tables, task lists)
import rehypeKatex from 'rehype-katex';       // <--- NEW: For LaTeX math rendering
import remarkMath from 'remark-math';         // <--- NEW: For parsing math blocks in markdown

interface MarkdownResult {
  contentHtml: string; // This will now be the serialized MDX HTML
}

export async function processMarkdown(markdownContent: string): Promise<MarkdownResult> {
  const mdxSource = await serialize(markdownContent, {
    parseFrontmatter: false, // Assuming frontmatter is handled by your DB logic
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkMath, // <-- Add remark-math here
      ],
      rehypePlugins: [
        rehypeHighlight,
        rehypeKatex,  // <-- Add rehype-katex here
      ],
      // Add other plugins as needed
    },
  });

  return { contentHtml: mdxSource.compiledSource };
}