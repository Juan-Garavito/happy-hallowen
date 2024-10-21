import { User } from "@/app/DB/definitions";
import { Session } from "../definitions";
import { get } from "http";
import { getUsers } from "@/app/DB/functions/getUsers";

export default async function findUSer(user : Session) {
  const users = await getUsers() 
  return users.some((u : User) => u.name === user.user.name);
}