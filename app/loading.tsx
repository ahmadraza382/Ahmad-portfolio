import Skeleton from "@/components/Skeleton";

// Root fallback for client-side navigations to routes without their own
// loading.tsx (e.g. the home page, which fetches featured projects). Keeps the
// previous page from freezing while the next route streams in.
export default function RootLoading() {
  return (
    <section className="max-w-content mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[90px]">
      <Skeleton className="h-[28px] w-[160px] mb-8 rounded-full" />
      <Skeleton className="h-[clamp(48px,9vw,110px)] w-[90%] max-w-[820px] mb-4" />
      <Skeleton className="h-[clamp(48px,9vw,110px)] w-[70%] max-w-[640px] mb-10" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[clamp(24px,3vw,44px)]">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="rounded-[16px] mb-[18px] aspect-[16/10]" />
            <Skeleton className="h-[22px] w-[70%] mb-[10px]" />
            <Skeleton className="h-[14px] w-full mb-2" />
            <Skeleton className="h-[14px] w-[60%]" />
          </div>
        ))}
      </div>
    </section>
  );
}
