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
import { ImageSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import "react-color-palette/css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export default function Image_Form() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [preview, setPreview] = useState<string>();

  const ImageForm = useForm<z.infer<typeof ImageSchema>>({
    resolver: zodResolver(ImageSchema),
  });

  const onSubmit = async (data: z.infer<typeof ImageSchema>) => {
    try {
      const fileList = data.image as FileList;
      const file = fileList[0];

      if (!file) {
        toast.error("Error", { description: "No file selected" });
        return;
      }
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/image", {
        method: "POST",
        body: formData,
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

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <>
      <div className="w-full">
        <Form {...ImageForm}>
          <form
            onSubmit={ImageForm.handleSubmit(onSubmit)}
            className="flex flex-row w-full lg:px-5 gap-2"
          >
            <FormField
              control={ImageForm.control}
              name="image"
              render={({}) => (
                <FormItem className="flex flex-col justify-center">
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl className="flex items-center rounded-md">
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="opacity-0 z-10 absolute w-16 h-16"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (!files || files.length === 0) {
                            ImageForm.setValue("image", undefined);
                            setPreview("");
                            return;
                          }
                          ImageForm.setValue("image", files);
                          if (preview) URL.revokeObjectURL(preview);
                          setPreview(URL.createObjectURL(files[0]));
                        }}
                      />
                      <Avatar className="z-0 size-20">
                        <AvatarImage
                          src={preview || `${session?.user.image}`}
                        />
                        <AvatarFallback>...</AvatarFallback>
                      </Avatar>
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex xs:w-[50%] lg:w-[20%] mt-14 rounded-md "
              disabled={loading}
            >
              {loading ? "loading.." : "Update Photo"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
