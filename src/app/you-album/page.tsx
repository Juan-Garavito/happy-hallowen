'use client'
import { RefObject, Suspense, useRef, useState } from "react";
import PanelAlbum from "./components/panelAlbum";
import PanelStamps from "./components/panelStamps";
import ButtonDownload from "./components/ButtonDownload";
import { downloadAlbum } from "./util/downloadAlbum";
import { Home } from "lucide-react";
import Link from "next/link";
import { ref } from "firebase/storage";

export default function Page() {
    const refAlbum = useRef<HTMLElement | null>(null);
    const refWarning = useRef<HTMLDivElement | null>(null);
    const [slotsFree, setSlotsFree] = useState(12);

    function onRefCurrentAlbum(album: HTMLElement) {
        refAlbum.current = album;
    }

    function onClickDownload(e: React.MouseEvent<HTMLButtonElement> ){
        (e.target as HTMLButtonElement).textContent = "Downloading..."
        
        if (refAlbum.current && slotsFree === 0) {
            downloadAlbum(refAlbum.current).then(() => {
                (e.target as HTMLButtonElement).textContent = "Download Album";
            });
            return;
        }

        refWarning.current?.classList.remove("hidden");
        refWarning.current?.classList.add("flex");
        refWarning.current?.classList.add("animate-pulse");
        (e.target as HTMLButtonElement).textContent = "Download Album";
        setTimeout(() => {
            refWarning.current?.classList.remove("flex");
            refWarning.current?.classList.add("hidden");
            refWarning.current?.classList.remove("animate-pulse");
        }, 2000);
    }

    function onSetSlotsFree(slotsFree: number) {
        setSlotsFree(slotsFree);
    }


    return (
        <div className="flex md:flex-row bg-gray-900 min-h-screen text-white justify-evenly">
            <div className="flex flex-col w-[30%]  h-screen">
                <PanelStamps />
                <div className="p-4 bg-gray-800">
                    <ButtonDownload onClick={(e)=>onClickDownload(e)} />
                </div>
            </div>
            <PanelAlbum onRefCurrentAlbum={onRefCurrentAlbum} onSetSlotsFree={onSetSlotsFree}/>
            <Link href="./" className={`absolute top-[2%] left-[2%] text-orange-500 hover:scale-110 transition-all ease-in-out`}>
                <Home size={40} />
            </Link>
            <div ref={refWarning} className="transition-all absolute w-1/3 h-1/3 hidden justify-center items-center top-[25%] bg-orange-500 font-semibold z-50  text-3xl border-gray-900 border-4 rounded-lg ">
                <p>you have to complete your album</p>
            </div> 
        </div>
    );
}