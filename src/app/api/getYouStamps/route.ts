import { getRefUserForName } from "@/app/DB/functions/getUserForName";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    const session = await getServerSession();
    if(!session || !session.user || !session.user.name){
        return NextResponse.redirect('/home');
    }

    const user = await getRefUserForName(session.user.name);
    const stampsUser= user.data().stamps.idPublics
    return NextResponse.json(stampsUser, {status : 200});
}