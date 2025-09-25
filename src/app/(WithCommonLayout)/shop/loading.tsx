import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-4 md:px-8 py-6 bg-background min-h-screen xl:max-w-[1300px] xl:mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl bg-[#ebeff1d3]" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-[#ebeff1d3]" />
              <Skeleton className="h-4 w-3/4 bg-[#ebeff1d3]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
