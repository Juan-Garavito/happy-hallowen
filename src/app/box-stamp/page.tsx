'use client'

import { useEffect, useState } from "react";
import BoxStamp from "./components/BoxStamp";
import { getRefUserForName } from "../DB/functions/getUserForName";
import { amatic_SC } from "../fonts/fonts";
import { Brain,  Home } from "lucide-react";
import ButtonOpenBox from "./components/ButtonOpenBox";
import { useSession } from "next-auth/react";
import BoxStampSkeleton from "./components/BoxStampSkeleton";
import MesssageError from "./components/MessageError";
import Link from "next/link";

const NUM_STAMPS_IN_BOX = 3;
const NUM_LIMIT_BOXES = 5;

export default function Page() {
    const { data: session } = useSession();
    const [numBoxUnopened, setNumBoxUnopened] = useState<number | null>(null)
    const [abierto, setAbierto] = useState(false);
    const [imagesBox, setImagesBox] = useState<string[]>([]);
    const [error, setError] = useState(null);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const fetchUserRef = async () => {
            if (session && session.user && session.user.name) {
                const userRef = await getRefUserForName(session.user.name);
                const amountStamps = userRef.data().stamps.amount;
                setNumBoxUnopened(NUM_LIMIT_BOXES - (amountStamps / NUM_STAMPS_IN_BOX));
            }
        };
        fetchUserRef();
    }, [session]);

    useEffect(() => {
        if (!abierto) return;

        fetch("/api/getBox")
            .then(res => res.json())
            .then(data => {

                if (data.error) {
                    setError(data.error);
                    return;
                }

                if (numBoxUnopened !== null) {
                    setNumBoxUnopened(() => numBoxUnopened - 1);
                }

                setImagesBox(data);
            })
    }, [abierto, reset]);



    function onClickOpenBox() {


        console.log("click")
        console.log(abierto, numBoxUnopened, imagesBox.length);
        if (abierto && numBoxUnopened !== null && numBoxUnopened > 0 && imagesBox.length == 3) {
            setReset(() => !reset);
            setImagesBox([]);
            return;
        }
        console.log("No more boxes");
        if (numBoxUnopened !== null && numBoxUnopened > 0) {
            setAbierto(true);
            console.log("boxes");
            return
        }
    }

    return (
        <div className={`h-screen p-4 text-2xl ${amatic_SC.className}`}>
            <p className="absolute top-4 text-orange-300 font-semibold">
                Unopened: <span className="text-orange-500">{numBoxUnopened ?? "?"}</span>
            </p>

            <Link href="/" className={`absolute top-[2%] right-[2%] text-orange-500 hover:scale-110 transition-all ease-in-out`}>
                <Home size={40} />
            </Link>

            <div className="flex flex-col items-center justify-between h-full">
                {!abierto ?
                    <>
                        <h1 className="flex font-bold text-6xl ml-25 text-orange-500 mb-8">Spooky Stamp Boxes</h1>
                        <Brain size={300} className="text-orange-500 " />
                        <ButtonOpenBox onClickOpenBox={onClickOpenBox}>
                            {numBoxUnopened === null ? ".........." :
                                numBoxUnopened === 0 ? "No more boxes" : "Open Box"}
                        </ButtonOpenBox>
                    </>
                    : ""}


                {abierto && !error && imagesBox.length > 0 ?
                    <>

                        <BoxStamp imagesBox={imagesBox} />
                        <ButtonOpenBox onClickOpenBox={onClickOpenBox}>
                            {numBoxUnopened === null ? ".........." :
                                numBoxUnopened === 0 ? "No more boxes" : "Open Box"}
                        </ButtonOpenBox>
                    </>
                    : ""
                }
                {abierto && !error && imagesBox.length <= 0 ? <BoxStampSkeleton /> : ""}

                {error && <MesssageError message={error}></MesssageError>}
            </div>

        </div>
    );
}