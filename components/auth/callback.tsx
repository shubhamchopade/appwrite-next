"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

import { account, db } from "@/lib/appwrite"
import { id } from "@/lib/constants"

const Callback = () => {
  const router = useRouter()
  useEffect(() => {
    try {
      const ac = async () => {
        // First, start the session.
        const uAccount = await account.get()
        console.log(uAccount)

        const username = window.location.href
          .split("?")[1]
          .split("&")[0]
          .split("=")[1]

        const prefs = account.updatePrefs({
          username,
        })

        try {
          const promise = db.createDocument(
            id.database.dc,
            id.collection.user,
            uAccount.$id,
            {
              name: uAccount.name,
              username,
            }
          )
        } catch (e) {
          console.log(e)
        }

        // Then, you can get the JWT
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

  return <div>Callback</div>
}

export default Callback
