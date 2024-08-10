import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2k8QZU3D43ubRj1OOW2fDheohOX",

]

export const isAdmin = () => {
    const { userId }  = auth();

    if(!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1
}