import { useBoxStamp } from "@/app/box-stamp/hooks/useBoxStamp";
import { NextResponse } from "next/server";


export async function GET() {
    const { imagesBox, error } = await useBoxStamp(3);
    if(error){
        return NextResponse.json({error}, {status : 500});
    }

    return NextResponse.json(imagesBox, {status : 200});
}