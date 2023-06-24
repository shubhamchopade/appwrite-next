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
    "user",
    [
      Permission.read(Role.users()),
      Permission.write(Role.users()),
      Permission.delete(Role.users()),
      Permission.update(Role.users()),
    ]
  )

  const collectionId = promise.$id

  const username = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "username",
    64,
    true
  )

  const bio = await databases.createStringAttribute(
    id.database.dc,
    collectionId,
    "bio",
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
