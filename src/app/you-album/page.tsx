'use client'
import { RefObject, Suspense, useRef, useState } from "react";
import PanelAlbum from "./components/panelAlbum";
import PanelStamps from "./components/panelStamps";
import ButtonDownload from "./components/ButtonDownload";
import { downloadAlbum } from "./util/downloadAlbum";
import { Home } from "lucide-react";
import Link from "next/link";

export default function Page() {
    const refAlbum = useRef<HTMLElement | null>(null);
    const [slotsFree, setSlotsFree] = useState(12);

    function onRefCurrentAlbum(album: HTMLElement) {
        refAlbum.current = album;
    }

    function onClickDownload(){
        if (refAlbum.current && slotsFree === 0) {
            downloadAlbum(refAlbum.current)
        }


    }

    function onSetSlotsFree(slotsFree: number) {
        setSlotsFree(slotsFree);
        console.log(slotsFree);
    }


    return (
        <div className="flex md:flex-row bg-gray-900 min-h-screen text-white justify-evenly">
            <div className="flex flex-col w-[30%]  h-screen">
                <PanelStamps />
                <div className="p-4 bg-gray-800">
                    <ButtonDownload onClick={onClickDownload} />
                </div>
            </div>
            <PanelAlbum onRefCurrentAlbum={onRefCurrentAlbum} onSetSlotsFree={onSetSlotsFree}/>
            <Link href="/" className={`absolute top-[2%] left-[2%] text-orange-500 hover:scale-110 transition-all ease-in-out`}>
                <Home size={40} />
            </Link>

        </div>
    );
}