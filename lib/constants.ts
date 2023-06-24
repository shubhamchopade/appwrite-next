export const id = {
  project: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  database: {
    dc: process.env.NEXT_PUBLIC_DATABASE_CARD_ID as string,
  },
  collection: {
    card: process.env.NEXT_PUBLIC_COLLECTION_CARD_ID as string,
    user: process.env.NEXT_PUBLIC_COLLECTION_USER_ID as string,
    media: process.env.NEXT_PUBLIC_COLLECTION_MEDIA_ID as string,
  },
  storage: {
    media: process.env.NEXT_PUBLIC_STORAGE_MEDIA_ID as string,
  },
}
