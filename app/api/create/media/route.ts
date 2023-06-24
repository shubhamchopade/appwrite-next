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
    "media",
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

  const bio = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "url",
    500,
    false
  )

  const name = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "name",
    64,
    false
  )

  return new Response(JSON.stringify(promise))
}
