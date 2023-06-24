"use client"

import React, { useEffect } from "react"

import { useAuthState } from "@/lib/auth-provider"

const Profile = (props) => {
  const [auth, owner, setOwner] = useAuthState((state) => [
    state.auth,
    state.owner,
    state.setOwner,
  ])

  useEffect(() => {
    const getProfile = async () => {
      if (auth) setOwner(auth.$id === props.data.$id)
    }

    getProfile()
  }, [auth])

  return (
    <div className="rounded border p-4">
      <p className="text-3xl">{props.data?.name}</p>
      <p className="text-xl opacity-50">{props.data?.bio}</p>
    </div>
  )
}

export default Profile
