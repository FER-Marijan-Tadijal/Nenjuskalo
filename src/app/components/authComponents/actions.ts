// src/app/auth/actions.ts
"use server";

import { signIn, signOut } from "next-auth/react";

export async function handleSignIn(provider: string) {
    await signIn(provider);
}

export async function handleSignOut() {
    await signOut();
}
