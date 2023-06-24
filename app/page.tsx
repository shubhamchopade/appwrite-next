import Grid from "@/components/grid"
import Landing from "@/components/landing"

import { getAccount } from "./page-data"

export default async function IndexPage() {
  const account = await getAccount()
  console.log({ account })

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Landing />
      <Grid />
    </section>
  )
}
