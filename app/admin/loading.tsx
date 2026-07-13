import Skeleton from "@/components/Skeleton";

export default function AdminLoading() {
  return (
    <div>
      <Skeleton className="h-[34px] w-[200px] mb-6" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-surface border border-border rounded-[16px] p-6">
            <Skeleton className="h-[13px] w-[60%] mb-4" />
            <Skeleton className="h-[32px] w-[40%]" />
          </div>
        ))}
      </div>
    </div>
  );
}
