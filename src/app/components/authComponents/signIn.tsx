import { signIn } from "@/app/auth"
 
export function SignInGithub() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Sign in with Github</button>
    </form>
  )
}

export function SignInGoogle() {
    return (
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button type="submit">Sign in with Google</button>
      </form>
    )
}