import { Button } from "@/components/ui/button";

interface ButtonOpenBoxProps {
    onClickOpenBox: () => void;
    children: React.ReactNode;
}

export default function ButtonOpenBox({ onClickOpenBox, children }: ButtonOpenBoxProps) {
    return (
        <Button
            className="w-64 p-6 text-3xl font-bold bg-orange-500 hover:bg-orange-600 text-black transition-all transform hover:scale-105 mb-8"
            onClick={() => onClickOpenBox()}
        >
            {children}
        </Button>
    );
}