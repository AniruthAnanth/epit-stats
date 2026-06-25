import Link from 'next/link';
import { getAllChapters } from '@/lib/mdx';

export default function Home() {
  const chapters = getAllChapters();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8" style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      <h1 className="text-center mb-12 font-bold text-4xl">
        An Introduction to Applied Statistics for Epidemiology
      </h1>

      <div className="w-[600px] max-w-full">
        {chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/${chapter.slug}`}
            className="flex no-underline py-2 items-baseline hover:underline"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <span className="whitespace-nowrap">{chapter.title}</span>
            <span className="flex-1 border-b border-dotted mx-2 min-w-8"></span>
            <span className="whitespace-nowrap">{chapter.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
