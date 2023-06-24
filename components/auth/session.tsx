"use client"

import React, { useEffect } from "react"

import { account } from "@/lib/appwrite"
import { useAuthState } from "@/lib/auth-provider"

const CheckSession = () => {
  const setAuth = useAuthState((state) => state.setAuth)

  useEffect(() => {
    const getSession = async () => {
      try {
        const uAccount = await account.get()
        setAuth(uAccount)
      } catch (e) {
        console.log(e)
      }
    }

    getSession()
  }, [])

  return <div></div>
}

export default CheckSession
