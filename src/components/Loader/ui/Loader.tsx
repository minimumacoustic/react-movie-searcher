import { Skeleton } from "@heroui/react"

export function Loader() {
    return (
      <>
        <div className="flex items-center flex-col">
          <Skeleton className="h-[450px]  lg:mt-3 mt-13 w-[300px] mb-9" />
        </div>
        <div className=" lg:ml-10 lg:grid lg:grid-cols-3 lg:grid-rows-3  lg:gap-x-108 lg:gap-y-3.5  flex flex-col items-center">
          <Skeleton className="h-6 mb-2 w-[300px]" />
          <Skeleton className="h-6 mb-2 w-[300px]" />
          <Skeleton className="h-6 mb-2 w-[300px]" />
          <Skeleton className="h-6 mb-2 w-[300px]" />
          <Skeleton className="h-6 mb-2 w-[300px]" />
          <Skeleton className="h-6 mb-2 w-[300px]" />
          <Skeleton className="h-6 mb-2 w-[300px]" />
          <Skeleton className="h-6 mb-2 w-[300px]" />
          <Skeleton className="h-6 mb-2 w-[300px]" />
        </div>
      </>
    );
}