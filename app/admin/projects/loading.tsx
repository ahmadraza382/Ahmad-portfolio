import Skeleton from "@/components/Skeleton";

export default function AdminProjectsLoading() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <Skeleton className="h-[34px] w-[160px]" />
        <Skeleton className="h-[46px] w-[90px] rounded-full" />
      </div>
      <div className="bg-surface border border-border rounded-[16px] overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-5 py-4"
            style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
          >
            <div className="flex-1">
              <Skeleton className="h-[16px] w-[45%] mb-2" />
              <Skeleton className="h-[12px] w-[30%]" />
            </div>
            <Skeleton className="h-[36px] w-[64px] rounded-[10px]" />
            <Skeleton className="h-[36px] w-[74px] rounded-[10px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
