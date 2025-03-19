"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
const formSchema = z.object({
  name_0167816294: z.string().min(1),
  name_4096809555: z.string().min(1),
  name_4673578893: z.string().min(1),
  name_3626416181: z.string().min(1),
  name_0093169272: z.string().min(1),
  name_0847074557: z.array(z.string()).nonempty("Please at least one item"),
  name_2667194778: z.boolean().default(false),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_0847074557: ["test"],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="name_0167816294"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Token</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Personal Acccess Token"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    add discussion and repo perms beforehand
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="name_4096809555"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Langchain API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Key" type="" {...field} />
                  </FormControl>
                  <FormDescription>For running agents</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="name_4673578893"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Groq API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Key" type="" {...field} />
                  </FormControl>
                  <FormDescription>For Groq models</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_3626416181"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username/Org Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Org handle" type="" {...field} />
                  </FormControl>
                  <FormDescription>Target GitHub user/org</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name_0093169272"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Org repo name" type="" {...field} />
                  </FormControl>
                  <FormDescription>Target repository</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="name_2667194778"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree that this product is pretty cool</FormLabel>
                <FormDescription>that is all we need to know!</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Deploy!</Button>
      </form>
    </Form>
  );
}
