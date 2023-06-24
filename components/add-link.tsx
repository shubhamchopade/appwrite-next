"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ID, Query } from "appwrite"

import { db, storage } from "@/lib/appwrite"
import { id } from "@/lib/constants"
import { useProfileStore } from "@/lib/profile-provider"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

const AddLink = (props) => {
  const auth = props.auth
  const path = usePathname()?.split("/")[1] as string
  const [link, setLink] = React.useState("")
  const [links, setLinks] = React.useState([])
  const [imageData, setImageData] = React.useState(null)
  const [images, setImages] = React.useState<{ result: URL; id: string }[]>()
  const profile = useProfileStore((state) => state.profile)

  useEffect(() => {
    const listFiles = async () => {
      const cards = await db.listDocuments(id.database.dc, id.collection.card, [
        Query.equal(id.collection.user, [profile.$id]),
      ])
      setLinks(cards.documents)

      const media = await db.listDocuments(
        id.database.dc,
        id.collection.media,
        [Query.equal(id.collection.user, [profile.$id])]
      )

      const imgs = media.documents.map((file) => {
        const result = storage.getFilePreview(
          id.storage.media as string,
          file.$id
        )
        return { result, id: file.$id }
      })
      setImages(imgs)
    }

    if (profile) listFiles()
  }, [profile])

  useEffect(() => {
    if (auth) {
      const listener = document.addEventListener("paste", (e) => {
        const clipboardData = e.clipboardData
        const dataTypes = clipboardData.types
        if (
          dataTypes.includes("image/png") ||
          dataTypes.includes("image/jpeg") ||
          dataTypes.includes("Files")
        ) {
          const blob = clipboardData.items[0].getAsFile()
          handleUploadImage(blob)
          const reader = new FileReader()
          reader.onload = function (event) {
            const imageData = event.target.result
            setImageData(imageData)
          }

          reader.readAsDataURL(blob)
        }

        ;() => {
          document.removeEventListener("paste", listener)
        }
      })
    }
  }, [])

  const handleUploadImage = (blob) => {
    const promise = storage.createFile(id.storage.media, ID.unique(), blob)
    // create an entry in media collection
    promise.then(
      function (response) {
        console.log(response) // Success
        const mediaPromise = db.createDocument(
          id.database.dc as string,
          id.collection.media as string,
          response.$id,
          {
            [id.collection.user]: auth.$id,
          }
        )
      },
      function (error) {
        console.log(error) // Failure
      }
    )
  }

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
      },
      function (error) {
        console.log(error) // Failure
      }
    )
  }

  const handleDeleteDocument = (_id) => {
    const promise = db.deleteDocument(id.database.dc, id.collection.card, _id)

    promise.then(
      function (response) {
        console.log(response) // Success
      },
      function (error) {
        console.log(error) // Failure
      }
    )
  }

  const handleDeleteImage = (_id) => {
    const mediaPromise = db.deleteDocument(
      id.database.dc as string,
      id.collection.media as string,
      _id
    )
    const promise = storage.deleteFile(id.storage.media as string, _id)

    promise.then(
      function (response) {
        console.log(response) // Success
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

        {imageData && <img src={imageData} alt="Pasted Image" />}

        <Button onClick={handleAddLink}>Add Link</Button>
      </div>
      <div>
        {images &&
          images.map((image, i) => (
            <div key={i}>
              <img src={image.result} alt="Pasted Image" />
              {auth && (
                <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteImage(image.id)}
                >
                  Delete Image
                </Button>
              )}
            </div>
          ))}
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <div className="w-72 border" key={link.$id}>
              {link.metaOgImage && (
                <Image
                  width={500}
                  height={100}
                  src={link.metaOgImage}
                  alt="Meta Image"
                />
              )}
              {link.metaFavicon && (
                <Image
                  width={20}
                  height={20}
                  src={link.metaFavicon}
                  alt="Meta Image"
                />
              )}
              <p className="my-2">{link.title}</p>
              <p className="mt-2 text-xs">{link.metaDescription}</p>
              {auth && (
                <Button
                  variant={"link"}
                  onClick={() => handleDeleteDocument(link.$id)}
                >
                  x
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddLink
