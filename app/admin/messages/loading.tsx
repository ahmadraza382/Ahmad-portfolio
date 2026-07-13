import Skeleton from "@/components/Skeleton";

export default function AdminMessagesLoading() {
  return (
    <div>
      <Skeleton className="h-[34px] w-[160px] mb-6" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-surface border border-border rounded-[14px] p-5">
            <div className="flex items-center justify-between gap-4 mb-3">
              <Skeleton className="h-[16px] w-[180px]" />
              <Skeleton className="h-[12px] w-[90px]" />
            </div>
            <Skeleton className="h-[14px] w-full mb-2" />
            <Skeleton className="h-[14px] w-[75%]" />
          </div>
        ))}
      </div>
    </div>
  );
}
