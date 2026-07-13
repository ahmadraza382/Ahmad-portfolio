import Skeleton from "@/components/Skeleton";

export default function CaseStudyLoading() {
  return (
    <article className="max-w-[1100px] mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[100px]">
      <Skeleton className="h-[14px] w-[160px] mb-[34px]" />
      <Skeleton className="h-[13px] w-[200px] mb-[18px]" />
      <Skeleton className="h-[clamp(44px,8vw,90px)] w-[80%] mb-[22px]" />
      <Skeleton className="h-[24px] w-[55%] mb-[40px]" />

      <div className="flex flex-wrap gap-[40px] py-[26px] border-t border-b border-border mb-[50px]">
        <div className="[&>*]:mb-[6px]">
          <Skeleton className="h-[11px] w-[40px]" />
          <Skeleton className="h-[16px] w-[120px]" />
        </div>
        <div className="[&>*]:mb-[6px]">
          <Skeleton className="h-[11px] w-[40px]" />
          <Skeleton className="h-[16px] w-[80px]" />
        </div>
      </div>

      <Skeleton className="rounded-[18px] aspect-[16/9] mb-[60px]" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[50px]">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="[&>*]:mb-3">
            <Skeleton className="h-[28px] w-[50%]" />
            <Skeleton className="h-[16px] w-full" />
            <Skeleton className="h-[16px] w-[90%]" />
            <Skeleton className="h-[16px] w-[80%]" />
          </div>
        ))}
      </div>
    </article>
  );
}
