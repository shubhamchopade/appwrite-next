import { NextResponse } from "next/server"
import * as setCookie from "set-cookie-parser"

import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APP_HOSTNAME,
} from "@/lib/appwrite"

export async function POST(request: Request) {
  const response = await fetch(
    `${APPWRITE_ENDPOINT}/account/sessions/anonymous`,
    {
      method: "POST",
      headers: {
        "x-appwrite-project": APPWRITE_PROJECT_ID,
      },
    }
  )

  const json = await response.json()

  if (json.code >= 400) {
    return NextResponse.json(
      { message: json.message },
      {
        status: 400,
      }
    )
  }

  const ssrHostname = APP_HOSTNAME
  const appwriteHostname = APPWRITE_ENDPOINT

  const cookiesStr = (response.headers.get("set-cookie") ?? "")
    .split(appwriteHostname)
    .join(ssrHostname)

  const cookiesArray = setCookie.splitCookiesString(cookiesStr)
  const cookiesParsed = cookiesArray.map((cookie: any) =>
    setCookie.parseString(cookie)
  )

  const nextJsResponse = NextResponse.json(json)

  for (const cookie of cookiesParsed) {
    nextJsResponse.cookies.set(cookie.name, cookie.value, {
      domain: cookie.domain,
      secure: cookie.secure,
      sameSite: cookie.sameSite as any,
      path: cookie.path,
      maxAge: cookie.maxAge,
      httpOnly: cookie.httpOnly,
      expires: cookie.expires,
    })
  }

  return nextJsResponse
}
