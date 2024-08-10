import { MobileSidebar } from "./mobile-sidebar"

export const MobileHeader = () => {
    return (
        <nav className="bg-green-500 lg:hidden px-6 h-[50px] flex items-center border-b fixed w-full top-0 z-50">
            <MobileSidebar />
        </nav>
    )
}