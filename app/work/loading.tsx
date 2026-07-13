import Skeleton from "@/components/Skeleton";

export default function WorkLoading() {
  return (
    <section className="max-w-content mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[90px]">
      <div className="mb-[48px]">
        <Skeleton className="h-[14px] w-[120px] mb-5" />
        <Skeleton className="h-[clamp(44px,8vw,90px)] w-[60%] max-w-[520px] mb-5" />
        <Skeleton className="h-[18px] w-[40%] max-w-[360px]" />
      </div>

      <div className="flex flex-wrap gap-[10px] mb-[44px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[40px] w-[92px] rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-[clamp(20px,3vw,40px)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="rounded-[16px] mb-[18px] aspect-[16/11]" />
            <div className="[&>*]:mb-2">
              <Skeleton className="h-[24px] w-[70%]" />
              <Skeleton className="h-[14px] w-full" />
              <Skeleton className="h-[14px] w-[85%]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
