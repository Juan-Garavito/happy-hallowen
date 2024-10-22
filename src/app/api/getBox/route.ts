export const dynamic = 'force-dynamic';  // Esto asegura que Next.js trate esta ruta como dinámica


import { getBoxStamp } from "@/app/box-stamp/util/getBoxStamp";
import { NextResponse } from "next/server";


export async function GET() {
    const { imagesBox, error } = await getBoxStamp(3);
    if(error){
        return NextResponse.json({error}, {status : 500});
    }

    return NextResponse.json(imagesBox, {status : 200});
}