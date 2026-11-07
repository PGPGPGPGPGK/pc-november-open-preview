/**
 * next/image loader for a static export under a base path. Static hosting can't
 * resize, so the file is served as-is; `?w=` only keeps Next's loader check happy.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}?w=${width}` : src;
}
