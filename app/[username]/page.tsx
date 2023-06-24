import { useRouter } from "next/navigation"
import { Query } from "node-appwrite"

import { account, db } from "@/lib/appwrite"
import { id } from "@/lib/constants"
import Cards from "@/components/cards"
import Dock from "@/components/dock"
import Profile from "@/components/profile"

export default async function IndexPage(props) {
  const username = props.params.username

  // try {
  //   const uAccount = await account.get()
  //   // console.log({ uAccount })
  // } catch (e) {
  //   console.log(e)
  // }

  let _cards = []

  const promise = await db.listDocuments(
    id.database.dc as string,
    id.collection.user as string,
    [Query.equal("username", [username as string])]
  )

  const _profile = promise.documents[0]

  if (_profile) {
    const cards = await db.listDocuments(id.database.dc, id.collection.card, [
      Query.equal(id.collection.user, [_profile.$id]),
    ])

    const _links = cards.documents.map((lnk) => {
      return {
        type: "card",
        data: {
          ...lnk,
        },
      }
    })
    const media = await db.listDocuments(id.database.dc, id.collection.media, [
      Query.equal(id.collection.user, [_profile.$id]),
    ])
    const _images = media.documents.map((crd) => {
      return {
        type: "image",
        data: {
          ...crd,
        },
      }
    })
    _cards = [..._links, ..._images]
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Dock />
      <Profile data={_profile} />
      <Cards data={_cards} />
    </section>
  )
}
