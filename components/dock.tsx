"use client"

import React from "react"

import { useAuthState } from "@/lib/auth-provider"

import { Button } from "./ui/button"
import AddLink from "./upload-link"
import Upload from "./upload-media"

const Dock = () => {
  const [auth, owner] = useAuthState((state) => [state.auth, state.owner])
  return (
    <div
      hidden={!owner}
      className="fixed bottom-10 right-10 grayscale backdrop-blur-sm"
    >
      <Upload auth={auth} />
      <AddLink auth={auth} />
    </div>
  )
}

export default Dock
