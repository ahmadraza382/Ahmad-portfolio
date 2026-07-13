import Skeleton from "@/components/Skeleton";

export default function BlogLoading() {
  return (
    <section className="max-w-content mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[90px]">
      <div className="mb-[48px]">
        <Skeleton className="h-[14px] w-[110px] mb-5" />
        <Skeleton className="h-[clamp(44px,8vw,90px)] w-[45%] max-w-[420px] mb-5" />
        <Skeleton className="h-[18px] w-[45%] max-w-[420px]" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[clamp(24px,3vw,44px)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="rounded-[16px] mb-[18px] aspect-[16/9]" />
            <Skeleton className="h-[13px] w-[130px] mb-3" />
            <Skeleton className="h-[22px] w-[80%] mb-[10px]" />
            <Skeleton className="h-[14px] w-full mb-2" />
            <Skeleton className="h-[14px] w-[70%]" />
          </div>
        ))}
      </div>
    </section>
  );
}
