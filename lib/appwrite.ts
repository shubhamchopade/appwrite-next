"use client"

import { Account, Client, ID } from "appwrite"

// Init your Web SDK
const client = new Client()

client
  .setEndpoint("https://apw.techsapien.dev/v1")
  .setProject("64813d518b1c3a091c2e")

const account = new Account(client)

export { account, client }
