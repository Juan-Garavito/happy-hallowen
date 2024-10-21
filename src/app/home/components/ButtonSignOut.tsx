'use client'

import { signOut } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

export default function ButtonSignOut({ children }: Props) {
    return (
        <button onClick={() => signOut(
        )} className="w-full p-3 flex text-2xl justify-center items-center font-bold bg-purple-700 hover:bg-purple-800 transition-colors">
            {children}
        </button>
    )

}