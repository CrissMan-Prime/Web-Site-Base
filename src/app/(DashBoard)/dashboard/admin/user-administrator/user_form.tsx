"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUserSchema, UserSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import "react-color-palette/css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/dataTable";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeIcon, EyeOffIcon, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function User_Form() {
  const [loading, setLoading] = useState(false);
  const [UserUpdate, setUserUpdate] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [user, setUser] = useState<UserType[]>([]);
  const [role, setRole] = useState<RoleType[]>([]);

  const UserForm = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
  });

  const UserUpdateForm = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
  });

  const onSubmitUpdate = async (data: z.infer<typeof UpdateUserSchema>) => {
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
      setUserUpdate(false);
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

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        body: JSON.stringify(UserUpdateForm.getValues("uuid")),
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

  const onSubmit = async (data: z.infer<typeof UserSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
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

  async function fetchUser() {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUser(data.message);
  }
  async function fetchRole() {
    const res = await fetch("/api/role");
    const data = await res.json();
    setRole(data.message);
  }

  useEffect(() => {
    fetchUser();
    fetchRole();
  }, [loading]);

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: "check",
      header: ({ table }) => (
        <div className="pr-1">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="pr-1">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "uuid",
      header: () => (
        <div className="flex flex-row text-start">
          <p>UUID</p>
        </div>
      ),
      cell: ({ row }) => {
        const data = String(row.getValue("uuid"));
        return (
          <div className=" flex flex-row">
            <HoverCard>
              <div className="truncate w-[70px]">
                <HoverCardTrigger>{data}</HoverCardTrigger>
              </div>
              <HoverCardContent className="w-[350px] text-center rounded-xl">
                {data}
              </HoverCardContent>
            </HoverCard>
          </div>
        );
      },
    },
    {
      accessorKey: "image",
      header: () => <p className="text-start">Profile Image</p>,
      cell: ({ row }) => {
        return (
          <Avatar>
            <AvatarImage src={`${row.getValue("image")}`} />
            <AvatarFallback>0</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => <p className="text-start">Name</p>,
      cell: ({ row }) => {
        const data = String(row.getValue("name"));

        return (
          <div className={`p-1 rounded-sm text-start flex flex-row`}>
            <div>{data}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "firstName",
      header: () => <p className="text-start">First Name</p>,
      cell: ({ row }) => {
        const data = String(row.getValue("firstName"));

        return (
          <div className={`p-1 rounded-sm text-start flex flex-row`}>
            <div>{data}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => <p className="text-start">Email</p>,
      cell: ({ row }) => {
        const data = String(row.getValue("email"));

        return <p>{data}</p>;
      },
    },
    {
      accessorKey: "emailVerified",
      header: () => <p className="text-center">Email Verified</p>,
      cell: ({ row }) => {
        const names = String(row.getValue("emailVerified"));
        if (names == "null" || "none") {
          return (
            <div className="flex items-center justify-center">
              <Checkbox disabled />
            </div>
          );
        }
        return (
          <div>
            <Checkbox defaultChecked disabled />
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: () => <p className="text-start">Role</p>,
      cell: ({ row }) => {
        const names = String(row.getValue("role"));

        return (
          <div className={`p-1 rounded-sm text-start flex flex-row`}>
            <div>{names}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "menu",
      header: () => <p></p>,
      cell: ({ row }) => {
        return (
          <div
            className={`p-1 justify-end rounded-sm text-start flex flex-row`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(row.getValue("uuid"));
                    toast.success("Success", {
                      description: row.getValue("uuid"),
                    });
                  }}
                >
                  Copy UUID
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    UserUpdateForm.setValue("uuid", row.getValue("uuid"));
                    onDelete();
                    setUserUpdate(false);
                  }}
                >
                  Delete
                </DropdownMenuItem>
                {UserUpdate === false ? (
                  <DropdownMenuItem
                    onClick={() => {
                      setUserUpdate(true);
                      UserUpdateForm.setValue("name", row.getValue("name"));
                      UserUpdateForm.setValue("uuid", row.getValue("uuid"));
                      UserUpdateForm.setValue(
                        "firstName",
                        row.getValue("firstName")
                      );
                      UserUpdateForm.setValue("email", row.getValue("email"));
                      UserUpdateForm.setValue("role", row.getValue("role"));
                    }}
                  >
                    Update
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  console.log(UserUpdateForm.getValues());

  return (
    <>
      <div className="flex md:flex-row flex-col w-full">
        <div className="flex flex-col w-full lg:w-[50%] lg:max-w-[50%] justify-start pt-5 items-center">
          {UserUpdate == false ? (
            <Form {...UserForm}>
              <form
                onSubmit={UserForm.handleSubmit(onSubmit)}
                className="flex flex-col w-full lg:px-5 gap-2"
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
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full justify-center">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl className="flex items-center w-full rounded-md">
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row w-full gap-2">
                  <FormField
                    control={UserForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full justify-center">
                        <FormLabel>Email</FormLabel>
                        <FormControl className="flex items-center w-full rounded-md">
                          <Input placeholder="Email" type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
                              <SelectValue />
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
                </div>
                <div className="flex flex-row gap-2">
                  <FormField
                    control={UserForm.control}
                    name="password"
                    render={({}) => (
                      <FormItem className="flex flex-col w-full justify-center">
                        <FormLabel>Password </FormLabel>
                        <FormControl className="flex items-center w-full rounded-md">
                          <div className="bg-input">
                            <Input
                              onChange={(e) => {
                                UserForm.setValue("password", e.target.value);
                              }}
                              type={passwordVisibility ? "text" : "password"}
                            />
                            <Button
                              variant={"ghost"}
                              type="button"
                              className="flex items-center  text-muted-foreground"
                              onClick={() =>
                                setPasswordVisibility(!passwordVisibility)
                              }
                            >
                              {passwordVisibility ? (
                                <EyeOffIcon />
                              ) : (
                                <EyeIcon />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="rounded-md pt-15"
                  disabled={loading}
                >
                  {loading ? "loading.." : "Create User"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...UserUpdateForm}>
              <form
                onSubmit={UserUpdateForm.handleSubmit(onSubmitUpdate)}
                className="flex flex-col w-full lg:px-5 gap-2"
              >
                <div className="flex flex-row w-full gap-2">
                  <FormField
                    control={UserUpdateForm.control}
                    name="firstName"
                    render={({}) => (
                      <FormItem className="flex flex-col w-full justify-center">
                        <FormLabel>First Name</FormLabel>
                        <FormControl className="flex items-center w-full rounded-md">
                          <Input
                            placeholder="First Name"
                            defaultValue={UserUpdateForm.getValues("firstName")}
                            onChange={(e) => {
                              UserUpdateForm.setValue(
                                "firstName",
                                e.target.value
                              );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={UserUpdateForm.control}
                    name="name"
                    render={({}) => (
                      <FormItem className="flex flex-col w-full justify-center">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl className="flex items-center w-full rounded-md">
                          <Input
                            placeholder="Name"
                            defaultValue={UserUpdateForm.getValues("name")}
                            onChange={(e) => {
                              UserUpdateForm.setValue("name", e.target.value);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row w-full gap-2">
                  <FormField
                    control={UserUpdateForm.control}
                    name="email"
                    render={({}) => (
                      <FormItem className="flex flex-col w-full justify-center">
                        <FormLabel>Email</FormLabel>
                        <FormControl className="flex items-center w-full rounded-md">
                          <Input
                            placeholder="Email"
                            type="email"
                            onChange={(e) => {
                              UserUpdateForm.setValue("email", e.target.value);
                            }}
                            defaultValue={UserUpdateForm.getValues("email")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={UserUpdateForm.control}
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
                              <SelectValue />
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
                </div>
                <div className="flex flex-row gap-2">
                  <FormField
                    control={UserUpdateForm.control}
                    name="password"
                    render={({}) => (
                      <FormItem className="flex flex-col w-full justify-center">
                        <FormLabel>Password</FormLabel>
                        <FormControl className="flex items-center w-full rounded-md">
                          <div className="bg-input">
                            <Input
                              onChange={(e) => {
                                UserUpdateForm.setValue(
                                  "password",
                                  e.target.value
                                );
                              }}
                              type={passwordVisibility ? "text" : "password"}
                            />
                            <Button
                              variant={"ghost"}
                              type="button"
                              className="flex items-center text-muted-foreground"
                              onClick={() =>
                                setPasswordVisibility(!passwordVisibility)
                              }
                            >
                              {passwordVisibility ? (
                                <EyeOffIcon />
                              ) : (
                                <EyeIcon />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <Button
                    type="submit"
                    className="rounded-md pt-15 w-[80%]"
                    disabled={loading}
                  >
                    {loading ? "loading.." : "Update User"}
                  </Button>
                  <Button
                    onClick={() => {
                      setUserUpdate(false);
                      UserUpdateForm.setValue("name", "");
                      UserUpdateForm.setValue("uuid", "");
                      UserUpdateForm.setValue("firstName", "");
                      UserUpdateForm.setValue("email", "");
                      UserUpdateForm.setValue("role", "");
                      UserUpdateForm.setValue("password", "");
                      UserForm.setValue("name", "");
                      UserForm.setValue("firstName", "");
                      UserForm.setValue("email", "");
                      UserForm.setValue("role", "");
                    }}
                    className="rounded-md pt-15 w-[30%]"
                    disabled={loading}
                  >
                    {loading ? "loading.." : "Cancel"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
        <div className="flex flex-col lg:max-w-[50%] w-full gap-4">
          <div className="flex h-full bg-card rounded-md mt-5 justify-center items-center w-full">
            <Avatar>
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="flex flex-col p-1 rounded-md">
                {UserUpdate != true ? (
                  <p>
                    {UserForm.getValues("firstName")}{" "}
                    {UserForm.getValues("name")}
                  </p>
                ) : (
                  <p>
                    {UserUpdateForm.getValues("firstName")}{" "}
                    {UserUpdateForm.getValues("name")}
                  </p>
                )}
              </p>
              <p className="flex flex-col p-1 rounded-md">
                {UserUpdate != true
                  ? UserForm.getValues("email")
                  : UserUpdateForm.getValues("email")}
              </p>
              <p className="flex truncate max-w-[30%] sm:hidden lg:block"></p>
            </div>
          </div>
        </div>
      </div>
      <DataTable data={user} searchBy={"email"} columns={columns} />
    </>
  );
}
