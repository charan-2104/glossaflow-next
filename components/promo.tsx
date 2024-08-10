"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Promo = () => {
    return (
        <div className="border-2 p-4 rounded-xl space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                    <Image 
                        src="/unlimited.svg"
                        alt="Pro"
                        height={26}
                        width={26}
                    />
                    <h3 className="font-bold text-l">
                        Upgarade to Pro
                    </h3>
                </div>
                <p className="text-muted-foreground">
                    Get unlimited hearts and more!
                </p>
            </div>
                <Button 
                    asChild
                    variant="super"
                    className="w-full"
                    size="lg"
                >
                    <Link href="/shop">
                        Upgarde now
                    </Link>
                </Button>
        </div>
    )
}