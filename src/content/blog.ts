// Eager = get frontmatter at build & components ready to render
const modules = import.meta.glob('/content/blog/**/*.mdx', { eager: true }) as Record<
  string,
  { default: React.ComponentType; frontmatter?: any }
>;

export type PostEntry = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  Component: React.ComponentType;
};

export const posts: PostEntry[] = Object.entries(modules).map(([path, mod]) => {
  const slug = path
    .replace('/content/blog/', '')
    .replace(/\/index\.mdx?$/, '')
    .replace(/\.mdx?$/, '');
  const fm = (mod as any).frontmatter ?? {};
  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date,
    description: fm.description,
    Component: mod.default,
  };
}).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

