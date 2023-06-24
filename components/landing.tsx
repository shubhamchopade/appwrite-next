"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

import { account } from "@/lib/appwrite"
import { useAuthState } from "@/lib/auth-provider"

import { Button } from "./ui/button"

const Landing = () => {
  const [username, setUsername] = React.useState("")

  const auth = useAuthState((state) => state.auth)

  const router = useRouter()

  useEffect(() => {
    if (auth) {
      router.push(auth?.prefs?.username)
    }
  }, [auth])

  const socialLogin = () => {
    account.createOAuth2Session(
      "google",
      `http://localhost:3000/auth/callback?username=${username}`,
      "http://localhost:3000"
    )
  }

  const loginSession = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: "",
      })
      const data = await res.json()
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="grid place-items-center">
      <Button onClick={loginSession}>Create Anonymous Session</Button>
      <h1 className="text-6xl font-bold">Directly Contact</h1>
      <p className="mt-4">Your personal hall of fame</p>
      <p className="mt-4">Connecting is easier than ever</p>
      <p className="mt-16 text-2xl">
        directly.contact/
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </p>
      <Button className="mt-4" size={"sm"} onClick={socialLogin}>
        Let’s create your profile
      </Button>
    </div>
  )
}

export default Landing
