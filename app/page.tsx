import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Login from "@/components/auth/login"
import Register from "@/components/auth/register"
import Grid from "@/components/grid"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Login />
      <Register />
      <Grid />
    </section>
  )
}
