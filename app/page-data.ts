import "server-only"
import { cookies } from "next/headers"

import { APPWRITE_PROJECT_ID, AppwriteService } from "@/lib/appwrite"

export async function getAccount() {
  const sessionNames = [
    "a_session_" + APPWRITE_PROJECT_ID.toLowerCase(),
    "a_session_" + APPWRITE_PROJECT_ID.toLowerCase() + "_legacy",
  ]

  const cookieStore = cookies()
  const hash =
    cookieStore.get(sessionNames[0]) ?? cookieStore.get(sessionNames[1]) ?? null
  AppwriteService.setSession(hash ? hash.value : "")

  let account
  try {
    account = await AppwriteService.getAccount()
  } catch (err) {
    account = null
  }

  return account
}
