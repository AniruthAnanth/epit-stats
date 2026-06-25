import Link from 'next/link';
import { Chapter } from '@/lib/mdx';

interface ChapterNavProps {
  prev: Chapter | null;
  next: Chapter | null;
}

export default function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav>
      {prev && <Link href={`/${prev.slug}`}>← {prev.title}</Link>}
      {next && <Link href={`/${next.slug}`}>{next.title} →</Link>}
    </nav>
  );
}
