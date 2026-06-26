import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Aside from '@/components/Aside';
import ChapterNav from '@/components/ChapterNav';
import CodeBlock from '@/components/CodeBlock';
import MDXImage from '@/components/MDXImage';
import MDXVideo from '@/components/MDXVideo';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Chapter {
  slug: string;
  title: string;
  description: string;
  module: number;
  order: number;
  date?: string;
}

export async function getChapter(slug: string) {
  const filePath = path.join(contentDirectory, slug, 'index.mdx');
  const source = fs.readFileSync(filePath, 'utf8');

  const { content, data } = matter(source);

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkMath,
        ],
        rehypePlugins: [
          rehypeHighlight,
          rehypeKatex,
        ],
      },
    },
    components: {
      Aside,
      ChapterNav,
      pre: CodeBlock,
      img: MDXImage,
      video: MDXVideo,
    },
  });

  return {
    content: mdxContent,
    frontMatter: data as Chapter,
  };
}

export function getAllChapters(): Chapter[] {
  const chapters: Chapter[] = [];

  const moduleDirs = fs.readdirSync(contentDirectory);

  for (const dir of moduleDirs) {
    const dirPath = path.join(contentDirectory, dir);
    const stat = fs.statSync(dirPath);

    if (stat.isDirectory()) {
      const indexPath = path.join(dirPath, 'index.mdx');
      if (fs.existsSync(indexPath)) {
        const source = fs.readFileSync(indexPath, 'utf8');
        const { data } = matter(source);

        chapters.push({
          slug: dir,
          ...(data as Omit<Chapter, 'slug'>),
        });
      }
    }
  }

  return chapters.sort((a, b) => a.order - b.order);
}

export function getNextChapter(currentSlug: string): Chapter | null {
  const chapters = getAllChapters();
  const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
  return chapters[currentIndex + 1] || null;
}

export function getPrevChapter(currentSlug: string): Chapter | null {
  const chapters = getAllChapters();
  const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
  return currentIndex > 0 ? chapters[currentIndex - 1] : null;
}
