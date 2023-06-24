"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { siteConfig } from "@/config/site"
import { account } from "@/lib/appwrite"
import { useAuthState } from "@/lib/auth-provider"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const auth = useAuthState((state) => state.auth)

  const router = useRouter()

  const socialLogin = () => {
    account.createOAuth2Session(
      "google",
      `http://localhost:3000/auth/signin-callback`,
      "http://localhost:3000"
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {auth && <p>{auth?.prefs?.username}</p>}
            <ThemeToggle />
            {auth ? (
              <Button
                onClick={() => {
                  account.deleteSession("current")
                }}
              >
                Signout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  socialLogin()
                }}
              >
                Signin
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
