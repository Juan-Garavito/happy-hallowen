import { RefObject } from "react";

interface ButtonDownloadProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function ButtonDownload({ onClick }: ButtonDownloadProps) {
    return (
        <button
        className="w-full text-3xl bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        onClick={onClick}
    >
        Download Album
    </button>
        );
}