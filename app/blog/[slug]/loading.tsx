import Skeleton from "@/components/Skeleton";

export default function BlogPostLoading() {
  return (
    <article className="max-w-[820px] mx-auto pt-[140px] px-[clamp(20px,5vw,64px)] pb-[80px]">
      <Skeleton className="h-[14px] w-[160px] mb-[30px]" />
      <Skeleton className="h-[13px] w-[180px] mb-[18px]" />
      <Skeleton className="h-[clamp(36px,6vw,64px)] w-[85%] mb-[26px]" />
      <Skeleton className="h-[22px] w-[60%] mb-[36px]" />
      <Skeleton className="rounded-[18px] aspect-[16/9] mb-[44px]" />

      <div className="max-w-[68ch] [&>*]:mb-4">
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[16px] w-[92%]" />
        <Skeleton className="h-[28px] w-[45%] mt-8" />
        <Skeleton className="h-[16px] w-full" />
        <Skeleton className="h-[16px] w-[88%]" />
        <Skeleton className="h-[16px] w-[95%]" />
      </div>
    </article>
  );
}
