import React from "react"
import { ID } from "appwrite"

import { db } from "@/lib/appwrite"
import { id } from "@/lib/constants"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

const Username = () => {
  const [username, setUsername] = React.useState("")

  const handleUsername = async (data) => {
    const promise = db.createDocument(id.project, id.database.dc, ID.unique(), {
      title: "Test",
      href: link,
      src: "https://www.google.com",
      rank: 1,
    })

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
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={() => handleUsername}>Submit</Button>
    </div>
  )
}

export default Username
