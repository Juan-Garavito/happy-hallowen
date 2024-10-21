import { Unplug } from "lucide-react";

interface PropsMessageError {
    message: string;   
}

export default function MesssageError({ message } : PropsMessageError) {
    return (
        <div className="flex flex-col items-center justify-evenly h-full">
            <p className="text-6xl text-orange-500 font-bold">{message}</p>
            <Unplug size={200} className="text-orange-500"/>
        </div>
    );
}