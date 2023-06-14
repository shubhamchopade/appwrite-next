"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

import { account } from "@/lib/appwrite"

const Callback = () => {
  const router = useRouter()
  useEffect(() => {
    try {
      const ac = async () => {
        // First, start the session.
        const uAccount = await account.get()
        console.log(uAccount)

        // Then, you can get the JWT
        const jwt = await account.createJWT()

        console.log(jwt)
      }

      ac()
    } catch (e) {
      console.log(e)
      // Error 401 it's okay. it means the user is not logged in
      // handle errors
    }
  }, [])

  return <div>Callback</div>
}

export default Callback
