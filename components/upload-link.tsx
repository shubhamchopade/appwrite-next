"use client"

import React, { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ID, Query } from "appwrite"

import { db, storage } from "@/lib/appwrite"
import { id } from "@/lib/constants"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

const AddLink = (props) => {
  const auth = props.auth
  const [link, setLink] = React.useState("")
  const router = useRouter()

  const handleAddLink = async () => {
    const meta = await fetch(`/api/meta?url=${link}`)

    const metaJson = await meta.json()
    const metadata = metaJson.metadata

    const payload = {
      [id.collection.user]: auth.$id,
      title: metadata.title,
      href: link,
      src: "https://www.google.com",
      rank: 1,
      metaDescription: metadata.description,
      metaOgImage: metadata.banner,
      metaFavicon: metaJson?.favicons[0],
      metaThemeColor: metadata.themeColor,
    }

    const promise = db.createDocument(
      id.database.dc as string,
      id.collection.card as string,
      ID.unique(),
      payload
    )

    promise.then(
      function (response) {
        console.log(response) // Success
        router.refresh()
      },
      function (error) {
        console.log(error) // Failure
      }
    )
  }

  return (
    <div>
      <div className="flex">
        <Input
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button onClick={handleAddLink}>Add Link</Button>
      </div>
    </div>
  )
}

export default AddLink
