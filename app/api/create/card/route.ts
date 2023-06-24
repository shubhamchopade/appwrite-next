// Path: app/api/create/card/route.ts

// All the variables that are used in the snippet above are defined here.
// title
// href
// src
// rank
// metaFavicon
// metaDescription
// metaOgImage
// metaThemeColor
// clicks

import sdk, { ID, Permission, Role } from "node-appwrite"

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "@/lib/appwrite"
import { id } from "@/lib/constants"

export async function POST(request: Request) {
  const key = request.headers.get("x-api-key")
  const client = new sdk.Client()

  const databases = new sdk.Databases(client)

  client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(key as string)

  const promise = await databases.createCollection(
    id.database.dc,
    ID.unique(),
    "card",
    [
      Permission.read(Role.users()),
      Permission.write(Role.users()),
      Permission.delete(Role.users()),
      Permission.update(Role.users()),
    ]
  )

  const collectionId = promise.$id

  const userId = databases.createRelationshipAttribute(
    id.database.dc,
    collectionId,
    id.collection.user,
    "manyToOne",
    undefined,
    undefined,
    undefined,
    "cascade"
  )

  const title = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "title",
    128,
    false
  )

  const href = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "href",
    256,
    false
  )

  const src = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "src",
    256,
    false
  )

  const rank = await databases.createIntegerAttribute(
    id.database.dc,
    collectionId,
    "rank",
    false
  )

  const metaFavicon = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "metaFavicon",
    128,
    false
  )

  const metaDescription = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "metaDescription",
    500,
    false
  )

  const metaOgImage = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "metaOgImage",
    200,
    false
  )

  const metaThemeColor = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "metaThemeColor",
    7,
    false
  )

  const clicks = await databases.createIntegerAttribute(
    id.database.dc,
    collectionId,
    "clicks",
    false
  )

  return new Response(JSON.stringify(promise))
}
