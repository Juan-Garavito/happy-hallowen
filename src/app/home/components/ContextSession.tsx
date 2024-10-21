'use client'
import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;  
}


export default function ContextSession({children} : Props) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}