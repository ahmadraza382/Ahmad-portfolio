import Skeleton from "@/components/Skeleton";

export default function ServiceLoading() {
  return (
    <section className="mx-auto w-[min(1400px,calc(100%-2*clamp(16px,3.5vw,56px)))] pt-[150px] pb-[90px]">
      <Skeleton className="h-[14px] w-[220px] mb-7" />
      <Skeleton className="h-[34px] w-[180px] rounded-full mb-6" />
      <Skeleton className="h-[clamp(34px,4.6vw,64px)] w-[70%] max-w-[680px] mb-3" />
      <Skeleton className="h-[clamp(34px,4.6vw,64px)] w-[45%] max-w-[420px] mb-7" />
      <Skeleton className="h-[18px] w-[65%] max-w-[560px] mb-2" />
      <Skeleton className="h-[18px] w-[48%] max-w-[420px] mb-9" />
      <Skeleton className="h-[56px] w-[220px] rounded-full mb-[70px]" />

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border p-7">
            <Skeleton className="h-[46px] w-[46px] rounded-full mb-6" />
            <Skeleton className="h-[20px] w-[65%] mb-4" />
            <Skeleton className="h-[14px] w-full mb-2" />
            <Skeleton className="h-[14px] w-[80%]" />
          </div>
        ))}
      </div>
    </section>
  );
}
