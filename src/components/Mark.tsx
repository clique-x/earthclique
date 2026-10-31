/** The flat EarthClique mark, inline so it takes the current text colour where needed. */
export function Mark({ className = "" }: { className?: string }) {
  return <img src="/brand/mark.svg" alt="" width={34} height={34} className={className} />;
}
