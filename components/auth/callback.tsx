"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

import { account } from "@/lib/appwrite"

const Callback = () => {
  const router = useRouter()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get("userId")
    const secret = urlParams.get("secret")

    if (userId && secret) {
      account
        .updateVerification(userId, secret)
        .then(() => {
          console.log("Verification success")
          router.push("/")
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [])

  return <div>Callback</div>
}

export default Callback
