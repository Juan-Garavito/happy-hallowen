import { Skeleton } from "@/components/ui/skeleton"
import { LoaderCircle } from "lucide-react"


export default function BoxStampSkeleton() {
    const skeletonStamps = Array(3).fill(null)
    return (
        <>

        <div className="w-full mt-10 grid grid-cols-2 sm:grid-cols-3  gap-2 p-3 ">
            {skeletonStamps.map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                    <Skeleton className="w-24 h-36 rounded-md bg-gray-700">
                    </Skeleton>
                    <Skeleton className="h-4 w-20 mt-2 bg-gray-600 rounded-full"></Skeleton>
                </div>
            ))}
        </div>
        <p className="text-8xl text-orange-500">Be patient this may take a while</p>
        <LoaderCircle size={150} className="animate-spin text-gray-700"/>
        </>
    )
}