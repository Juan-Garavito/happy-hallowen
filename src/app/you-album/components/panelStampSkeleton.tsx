import { Skeleton } from "@/components/ui/skeleton"

export default function PanelStampsSkeleton() {
    return (
        <ul className="grid grid-cols-3  gap-x-[100%]  h-full">
            {Array.from({ length: 9 }).map((_, index) => (
                <li
                    key={index}
                    className="w-20 h-20"
                >
                    <Skeleton className="w-full h-full rounded-lg border-2 border-orange-500/20 " />
                </li>
            ))}
        </ul>
    )
}
