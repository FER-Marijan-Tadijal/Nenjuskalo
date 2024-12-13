/* 
import { useEffect, useState } from "react";
import { auth } from "./auth";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function Component() {
  //const { data: session, status } = useSession()

  const [session, setSession] = useState<Session>();

  const getSession = async () => {
    try {
      const result = await auth();
      if (result != null) {
        setSession(result);
        console.log(session)
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getSession();
  }, [])



  if (session != null) {
    return (
      <>
        <p>Email: {session.user?.email ?? ""}</p>
        <p>Name: {session.user?.name ?? ""}</p>
        <img src={session.user?.image ?? ""}></img>
        <a href="/api/auth/signout">Sign out</a>
      </>
    )
  }

  return <a href="/api/auth/signin">Sign in here</a>
}
 */

"use server"

import { auth } from "./auth";

export default async function Component() {
  //const { data: session, status } = useSession()
  const session = await auth();

  if (session != null) {
    return (
      <>
        <p>Email: {session.user?.email ?? ""}</p>
        <p>Name: {session.user?.name ?? ""}</p>
        <img src={session.user?.image ?? ""}></img>
        <a href="/api/auth/signout">Sign out</a>
      </>
    )
  }

  return <a href="/api/auth/signin">Sign in</a>

}