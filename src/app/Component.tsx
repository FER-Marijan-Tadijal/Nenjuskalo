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
