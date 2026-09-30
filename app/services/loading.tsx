import Skeleton from "@/components/Skeleton";

export default function ServicesLoading() {
  return (
    <section className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] pt-[150px] pb-[90px]">
      <Skeleton className="h-[14px] w-[140px] mb-6" />
      <Skeleton className="h-[clamp(34px,4.6vw,64px)] w-[55%] max-w-[480px] mb-6" />
      <Skeleton className="h-[18px] w-[70%] max-w-[560px] mb-3" />
      <Skeleton className="h-[18px] w-[50%] max-w-[400px] mb-[60px]" />

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border p-8">
            <Skeleton className="h-[46px] w-[46px] rounded-full mb-6" />
            <Skeleton className="h-[22px] w-[70%] mb-4" />
            <Skeleton className="h-[14px] w-full mb-2" />
            <Skeleton className="h-[14px] w-[88%] mb-2" />
            <Skeleton className="h-[14px] w-[60%]" />
          </div>
        ))}
      </div>
    </section>
  );
}
