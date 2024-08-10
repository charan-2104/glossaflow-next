

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { quests } from "@/constants"
import { Progress } from "@/components/ui/progress"

type Props = {
    points: number
}

export const Quests = ({points}: Props) => {
    return (
        <div className="border-2 p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg">
                    Quests
                </h3>
                <Link href="/quests">
                    <Button 
                        variant="primaryOutline"
                        size="sm"
                    >
                        view all
                    </Button>
                </Link>
            </div>
            <ul className="w-full">
                {quests.slice(0,3).map((quest) => {
                    const progress = (points / quest.value) * 100

                    return (
                        <div 
                            key={quest.title}
                            className="flex items-center w-full pb-4 gap-x-3"    
                        >
                            <Image 
                                src="/points.svg"
                                alt="points"
                                width={40}
                                height={40}
                            />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-neutral-700 text-sm font-bold">
                                    {quest.title}
                                </p>
                                <Progress value={progress} className="h-2" />
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}