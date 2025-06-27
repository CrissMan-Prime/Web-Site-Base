"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UpdateUserSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordField } from "@/components/ui/pass-input";

export default function User_Form() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<RoleType[]>([]);

  const UserForm = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      uuid: session?.user.uuid,
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateUserSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify(data),
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

  async function fetchRole() {
    const res = await fetch("/api/role");
    const data = await res.json();
    setRole(data.message);
  }

  useEffect(() => {
    fetchRole();
  }, [loading]);

  return (
    <div className="flex flex-col lg:w-[60%] justify-start pt-5 items-center">
      <div className="flex flex-row w-full">
        <Form {...UserForm}>
          <form
            onSubmit={UserForm.handleSubmit(onSubmit)}
            className="flex flex-col w-full lg:px-5 gap-6"
          >
            <div className="flex flex-row w-full gap-2">
              <FormField
                control={UserForm.control}
                name="firstName"
                render={({}) => (
                  <FormItem className="flex flex-col w-full justify-center">
                    <FormLabel>First Name</FormLabel>

                    <FormControl className="flex items-center w-full rounded-md">
                      <Input
                        placeholder="First Name"
                        defaultValue={session?.user.firstName}
                        onChange={(e) => {
                          UserForm.setValue("firstName", e.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={UserForm.control}
                name="name"
                render={({}) => (
                  <FormItem className="flex flex-col w-full justify-center">
                    <FormLabel>Last Name</FormLabel>

                    <FormControl className="flex items-center w-full rounded-md">
                      <Input
                        placeholder="Last Name"
                        defaultValue={session?.user.name}
                        onChange={(e) => {
                          UserForm.setValue("name", e.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={UserForm.control}
              name="email"
              render={({}) => (
                <FormItem className="flex flex-col w-full justify-center">
                  <FormLabel>Email</FormLabel>

                  <FormControl className="flex items-center w-full rounded-md">
                    <Input
                      placeholder="Email"
                      type="email"
                      defaultValue={session?.user?.email}
                      onChange={(e) => {
                        UserForm.setValue("email", e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2">
              <FormField
                control={UserForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full justify-center">
                    <FormLabel>Password for update</FormLabel>

                    <FormControl className="flex items-center w-full rounded-md">
                      <PasswordField
                        placeholder="Yor password for update"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {session?.user?.role == "Owner" ? (
                <FormField
                  control={UserForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full justify-center">
                      <FormLabel>Role</FormLabel>

                      <FormControl className="flex items-center w-full rounded-md">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={session?.user.role} />
                          </SelectTrigger>
                          <SelectContent>
                            {role.map((role, index) => (
                              <SelectItem key={index} value={role.name}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : null}
            </div>
            <Button
              type="submit"
              className="rounded-md mt-4 lg:pt-15 lg:w-[50%]"
              disabled={loading}
            >
              {loading ? "loading.." : "Update User"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
