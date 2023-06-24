"use client"

import React, { useCallback, useEffect } from "react"
import { ID } from "appwrite"
import { useDropzone } from "react-dropzone"

import { db, storage } from "@/lib/appwrite"
import { useAuthState } from "@/lib/auth-provider"
import { id } from "@/lib/constants"

const Upload = (props) => {
  const auth = props.auth
  const [files, setFiles] = React.useState([])
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      handleUploadImage(file)
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        setFiles(binaryStr)
      }
      reader.readAsDataURL(file)
    })
  }, [])

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
          }

          reader.readAsDataURL(blob)
        }

        ;() => {
          document.removeEventListener("paste", listener)
        }
      })
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleUploadImage = async (blob) => {
    const promise = await storage.createFile(
      id.storage.media,
      ID.unique(),
      blob
    )

    if (auth) {
      const mediaPromise = await db.createDocument(
        id.database.dc,
        id.collection.media,
        promise.$id,
        {
          [id.collection.user]: auth.$id,
          name: blob.name,
        }
      )

      console.log({ mediaPromise })
    }
  }

  return (
    <div
      className="grid cursor-pointer place-items-center border p-8"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default Upload
