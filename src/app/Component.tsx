"use client"
import { useSession } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
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
