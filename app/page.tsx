import Link from 'next/link';
import { getAllChapters } from '@/lib/mdx';

export default function Home() {
  const chapters = getAllChapters();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8" style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
      <h1 className="text-center mb-8 sm:mb-12 font-bold text-3xl sm:text-4xl md:text-5xl px-4">
        An Introduction to Applied Statistics for Epidemiology
      </h1>

      <div className="w-full max-w-[600px] px-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/${chapter.slug}`}
            className="flex no-underline py-1 items-baseline hover:underline text-lg sm:text-xl justify-center sm:justify-start text-blue-600"
          >
            <span className="whitespace-nowrap">{chapter.title}</span>
            <span className="hidden sm:flex flex-1 border-b border-dotted mx-2 min-w-4"></span>
            <span className="hidden sm:inline whitespace-nowrap">{chapter.date}</span>
          </Link>
        ))}
      </div>

      <p className="pt-4 text-lg sm:text-xl">More coming soon!</p>
    </div>
  );
}
