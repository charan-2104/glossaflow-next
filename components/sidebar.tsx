import Link from "next/link";
import Image from "next/image";
import {
    ClerkLoading,
    ClerkLoaded,
    UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";


type Props = {
    className?: string;
}


export const Sidebar = ({className}: Props) => {
    return (
        <div className= {cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
            className,
        )}>
            <Link href="/learn">
            <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                <Image src="/mascot.svg" width={40} height={40} alt="Mascot" />
                <h1 className="text-xl font-extrabold text-green-600 tracking-wide">
                    GLOSSA
                    <span className="pl-[2px] text-xl font-extrabold text-rose-600 tracking-wide inline-flex items-center" >
                    FLOW
                    </span>
                </h1>
            </div>

            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg"></SidebarItem>
                <SidebarItem label="leaderboard" href="/leaderboard" iconSrc="/leaderboard.svg"></SidebarItem>
                <SidebarItem label="quests" href="/quests" iconSrc="/quests.svg"></SidebarItem>
                <SidebarItem label="shop" href="/shop" iconSrc="/shop.svg"></SidebarItem>
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton />
                </ClerkLoaded>
            </div>
        </div>
    )
}