"use client";

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
import { TestSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import "react-color-palette/css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export default function Test_Form() {
  const [loading, setLoading] = useState(false);

  const PermissionForm = useForm<z.infer<typeof TestSchema>>({
    resolver: zodResolver(TestSchema),
  });

  const onSubmit = async (data: z.infer<typeof TestSchema>) => {
    try {
      const file = data.image?.[0];
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const message = (await response.json()).message as string;

      if (response.status >= 300 && response.status <= 599) {
        setLoading(false);
        toast.error("Error", {
          description: `${message}`,
        });
        return null;
      }

      setLoading(false);
      toast.success("Success", {
        description: `${message}`,
      });
    } catch (err) {
      setLoading(false);
      toast.error("Internal Error", {
        description: `${err}`,
      });
    }
  };

  return (
    <>
      <hr />
      <div className="flex md:flex-row flex-col gap-2 w-full">
        <div className="flex flex-col lg:w-[50%] lg:max-w-[50%] justify-start pt-5 items-center">
          <Form {...PermissionForm}>
            <form
              onSubmit={PermissionForm.handleSubmit(onSubmit)}
              className="flex flex-col w-full lg:px-5 gap-2"
            >
              <FormField
                control={PermissionForm.control}
                name="image"
                render={({}) => (
                  <FormItem className="flex flex-col basis-3 w-full justify-center">
                    <FormLabel>Name</FormLabel>
                    <FormControl className="flex items-center w-full rounded-md">
                      <Input
                        type="file"
                        accept="image/*"
                        placeholder="Permission Name"
                        onChange={(e) => {
                          PermissionForm.setValue("image", e.target.files);
                        }}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-md pt-15 "
                disabled={loading}
              >
                {loading ? "loading.." : "Create Permission"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
