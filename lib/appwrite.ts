import { Account, Avatars, Client, Databases, Storage } from "appwrite"

// Init your Web SDK
const client = new Client()

export const APPWRITE_PROJECT_ID: string = "64813d518b1c3a091c2e"
export const APPWRITE_ENDPOINT: string = "https://apw.techsapien.dev/v1"

// Used by SSR
export const APP_HOSTNAME: string = "localhost"
export const APPWRITE_HOSTNAME: string = "apw.techsapien.dev"

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID)

const account = new Account(client)

const db = new Databases(client)

const storage = new Storage(client)
const avatars = new Avatars(client)

export { account, db, storage }

export const AppwriteService = {
  signOut: async () => {
    await account.deleteSession("current")
  },
  getAccount: async () => {
    return await account.get<any>()
  },
  getAccountPicture: (name: string) => {
    return avatars
      .getInitials(name.split("").reverse().join(""), 256, 256)
      .toString()
  },
  setSession: (hash: string) => {
    const authCookies: any = {}
    authCookies["a_session_" + APPWRITE_PROJECT_ID] = hash
    client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies)
  },
}
