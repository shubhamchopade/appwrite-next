"use client"

import React from "react"
import Image from "next/image"

import { db, storage } from "@/lib/appwrite"
import { useAuthState } from "@/lib/auth-provider"
import { id } from "@/lib/constants"
import { useProfileStore } from "@/lib/profile-provider"

import { Button } from "./ui/button"

const Cards = (props) => {
  const auth = useAuthState((state) => state.auth)
  const [images, setImages] = React.useState<{ result: URL; id: string }[]>()

  const [links, setLinks] = React.useState([])
  const [cards, setCards] = React.useState(props.data)
  const [title, setTitle] = React.useState("")
  const profile = useProfileStore((state) => state.profile)
  const ref = React.useRef(new Array())

  // useEffect(() => {
  //   const current = ref.current[0]

  //   console.log(current)
  //   const observer = new MutationObserver((mutations) => {
  //     mutations.forEach((mutation) => {
  //       if (mutation.type === "characterData") {
  //         console.log(mutation.oldValue)
  //       }
  //     })
  //   })

  //   if (current) observer.observe(current, { characterData: true })

  // }, [ref.current])
  //   console.log(ref)
  // useEffect(() => {
  //   const listFiles = async () => {
  //     const cards = await db.listDocuments(id.database.dc, id.collection.card, [
  //       Query.equal(id.collection.user, [profile.$id]),
  //     ])
  //     const _links = cards.documents.map((lnk) => {
  //       return {
  //         type: "card",
  //         data: {
  //           ...lnk,
  //         },
  //       }
  //     })
  //     setLinks(_links)

  //     const media = await db.listDocuments(
  //       id.database.dc,
  //       id.collection.media,
  //       [Query.equal(id.collection.user, [profile.$id])]
  //     )

  //     const _images = media.documents.map((crd) => {
  //       return {
  //         type: "image",
  //         data: {
  //           ...crd,
  //         },
  //       }
  //     })

  //     setImages(_images)

  //     const _cards = [..._links, ..._images]
  //     setCards(_cards)
  //     // console.log({ _cards })
  //   }

  //   if (profile) listFiles()
  // }, [profile])w

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

  const deleteDocument = (type, _id) => {
    if (type === "card") {
      handleDeleteDocument(_id)
    } else {
      handleDeleteImage(_id)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {cards.map((card) => {
          if (card.type === "card") {
            const getRef = (element) => ref.current.push(element)

            return (
              <div
                key={card.data.$id}
                className="max-w-xs rounded border bg-secondary p-4"
              >
                {card.data.metaOgImage && (
                  <Image
                    width={500}
                    height={100}
                    src={card.data.metaOgImage}
                    alt="Meta Image"
                  />
                )}
                {card.data.metaFavicon && (
                  <Image
                    width={20}
                    height={20}
                    src={card.data.metaFavicon}
                    alt="Meta Image"
                  />
                )}
                {/* <p
                  ref={ref}
                  contentEditable={true}
                  dangerouslySetInnerHTML={{ __html: card.data.title }}
                  className="font-bold"
                ></p> */}
                <div
                  ref={getRef}
                  contentEditable={true}
                  dangerouslySetInnerHTML={{ __html: card.data.title }}
                ></div>
                <Button
                  onClick={() => deleteDocument(card.type, card.data.$id)}
                >
                  Delete
                </Button>
              </div>
            )
          } else {
            return (
              <div key={card.data.$id} className="rounded border p-4">
                <Image
                  src={`https://apw.techsapien.dev/v1/storage/buckets/${id.storage.media}/files/${card.data.$id}/preview?project=${id.project}`}
                  width={300}
                  height={100}
                  alt={card.data.name}
                />
                <Button
                  onClick={() => deleteDocument(card.type, card.data.$id)}
                >
                  Delete
                </Button>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Cards
