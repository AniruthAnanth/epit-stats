import Link from 'next/link';
import { Chapter } from '@/lib/mdx';

interface ChapterNavBarProps {
  prev: Chapter | null;
  next: Chapter | null;
}

export default function ChapterNavBar({ prev, next }: ChapterNavBarProps) {
  return (
    <nav className="flex justify-between items-center">
      <div className="w-1/3">
        <Link
          href={prev ? `/${prev.slug}` : '/'}
          className="hover:underline"
          style={{ color: 'var(--color-link)' }}
          title={prev ? prev.title : 'Home'}
        >
          ← Previous
        </Link>
      </div>

      <div className="w-1/3 flex justify-center">
        <Link href="/" className="font-medium hover:underline" style={{ color: 'var(--color-link)' }}>
          Home
        </Link>
      </div>

      <div className="w-1/3 flex justify-end">
        <Link
          href={next ? `/${next.slug}` : '/'}
          className="hover:underline"
          style={{ color: 'var(--color-link)' }}
          title={next ? next.title : 'Home'}
        >
          Next →
        </Link>
      </div>
    </nav>
  );
}
