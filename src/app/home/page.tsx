import { Candy, Ghost, Github, Moon, Skull, SquareX } from "lucide-react"
import Link from "next/link";
import ButtonSignIn from "./components/ButtonSignIn";
import ButtonSignOut from "./components/ButtonSignOut";
import { getServerSession } from "next-auth";
import findUSer from "./util/findUser";
import { Session } from "./definitions";
import saveUser from "../DB/functions/saveUser";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import { creepster, amatic_SC } from "../fonts/fonts";



export default async function Home() {
  const session : Session | null  = await getServerSession();
  
  if(session ){
    const existUser = await findUSer(session)
    if(!existUser) {
      const user = {
        name: session.user.name,
        stamps: {
          idPublics: [],
          amount: 0
        }
      }
      saveUser(user);
    }
   
  }

  return (
    <div className="min-h-screen  bg-gray-900  flex items-center justify-center p-4 relative overflow-hidden">
      <Ghost size={200} className={`absolute top-[45%] right-10 text-white  ${session && "animate-bounce"}`} />
      <Ghost size={200} className={`absolute top-[45%] left-10 text-white ${session && "animate-bounce"}`} />
      
      <div className="w-full max-w-md  text-orange-100  overflow-hidden">
        <div className="text-center relative p-6">
          <h1 className={`${creepster.className} text-8xl font-bold mt-12`}>
            Welcome<br/> t<span className="inline"><Skull size={85}  color="white" className="inline mr-1 mb-1"/></span>
            <br></br><span className="text-orange-500 text-6xl">Happy Halloween</span>
          </h1>
        </div>
        
        <div className={`${amatic_SC.className} space-y-6 p-6`}>
          {session ? (
            <>
              <Link href="./you-album">
                <Button  className="w-full mb-2 text-2xl font-bold hover:bg-orange-500 hover:text-black transition-colors bg-gray-800">
                  <Moon className="mr-2" /> Your Haunted Album
                </Button>
              </Link>
              <Link href="./box-stamp">
                <Button  className="w-full text-2xl font-bold hover:bg-orange-500 hover:text-black transition-colors bg-gray-800">
                  <Candy className="mr-2" /> Your Spooky Stamps
                </Button>
              </Link>
              <ButtonSignOut >
                <SquareX className="mr-2" />Escape the Haunted House
              </ButtonSignOut>
            </>
          ) : (
            <ButtonSignIn >
              <Github className="mr-2" /> <p>Sign In (if you dare)</p>
            </ButtonSignIn>
          )}
        </div>

      </div>
    </div>
  );
}
