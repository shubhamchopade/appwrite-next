"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

import { account, db } from "@/lib/appwrite"
import { id } from "@/lib/constants"

const SignInCallback = () => {
  const router = useRouter()
  useEffect(() => {
    try {
      const ac = async () => {
        // First, start the session.
        const uAccount = await account.get()
        console.log(uAccount)

        const jwt = await account
          .createJWT()
          .then((res) => router.push("/"))
          .catch((e) => router.push("/"))
      }

      ac()
    } catch (e) {
      console.log(e)
      // Error 401 it's okay. it means the user is not logged in
      // handle errors
    }
  }, [])

  return <div>Signin Callback</div>
}

export default SignInCallback
