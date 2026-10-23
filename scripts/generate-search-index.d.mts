export const searchIndexInputFiles: string[];

export function createSearchIndex(root?: string): Array<{
  page: string;
  title: string;
  href: string;
  slug: string;
  topics: string[];
  description: string;
  content: string;
}>;

export function generateSearchIndex(options?: {
  root?: string;
  check?: boolean;
  silent?: boolean;
}): { changed: boolean; target: string };

export function watchSearchIndex(options?: { root?: string }): () => void;
