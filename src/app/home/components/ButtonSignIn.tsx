'use client'

import { signIn } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

export default function ButtonSignIn({ children }: Props) {
    return (
        <button onClick={() => signIn('github'
        )} className="w-full flex justify-center p-3 text-2xl font-bold bg-orange-500 hover:bg-orange-600 text-black transition-colors">
            {children}
        </button>
    )

}