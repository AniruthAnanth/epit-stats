import { getChapter, getAllChapters, getNextChapter, getPrevChapter } from '@/lib/mdx';
import ChapterNavBar from '@/components/ChapterNavBar';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontMatter } = await getChapter(slug);
  return {
    title: `${frontMatter.title} | An Introduction to Applied Statistics for Epidemiology`,
    description: frontMatter.description,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { content, frontMatter } = await getChapter(slug);
  const next = getNextChapter(slug);
  const prev = getPrevChapter(slug);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="w-full max-w-4xl shadow-lg p-8" style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border)',
        borderWidth: '1px',
        borderStyle: 'solid'
      }}>
        <ChapterNavBar prev={prev} next={next} />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12 mt-8 mb-2">
          <article>
            <header className="mb-6 border-left border-gray-300 border-l-4 pl-4">
              {/* <div className="text-sm text-gray-500 mb-1">Module {frontMatter.module}</div> */}
              <h1 className="text-4xl font-bold mb-2">{frontMatter.title}</h1>
              <p className="text-lg text-gray-600">{frontMatter.description}</p>
            </header>

            <Suspense fallback={<div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
            </div>}>
              <div className="prose prose-lg max-w-none">
                {content}
              </div>
            </Suspense>
          </article>

          <div className="aside-column">
            {/* Asides will appear here */}
          </div>
        </div>

        <ChapterNavBar prev={prev} next={next} />
      </div>
    </div>
  );
}
