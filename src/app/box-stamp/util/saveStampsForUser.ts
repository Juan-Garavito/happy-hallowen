import { getRefUserForName } from "@/app/DB/functions/getUserForName";
import { getServerSession } from "next-auth";

export default async function saveStampsForUser(stamps : string[]) {
    const session = await getServerSession();
    if (session?.user?.name) {
        const user  = await getRefUserForName(session.user.name);
        try{
            user.ref.update({
                stamps: {
                    idPublics: [...user.data().stamps.idPublics, ...stamps],
                    amount: stamps.length + user.data().stamps.amount
                }
            })
        }catch(e){
            throw new Error("Error updating user stamps")
        }
            
    } else {
        throw new Error("User session or user name is not defined");
    }
}