"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Account, ID } from "appwrite"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { account } from "@/lib/appwrite"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
})

const Register = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    const createAccount = async () => {
      try {
        const accountRes = await account.create(
          ID.unique(),
          values.email,
          values.password,
          values.name
        )
        console.log(accountRes)
      } catch (e) {
        console.log(e)
      }
    }

    createAccount()
  }

  return (
    <div className="max-w-xs">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Shubham Chopade" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shubham@directly.contact" {...field} />
                </FormControl>
                <FormDescription>Valid email address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="**********" {...field} />
                </FormControl>
                <FormDescription>Strong password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-right" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Register
