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
import { RoleSchema, RoleUpdateSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import "react-color-palette/css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ColorPicker, useColor } from "react-color-palette";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MultiSelect } from "@/components/ui/multi-select";
import { Checkbox } from "@/components/ui/checkbox";
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
import { MoreHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Role_Form() {
  const [loading, setLoading] = useState(false);
  const [RoleUpdate, setRoleUpdate] = useState(false);
  const [color, setColor] = useColor("#2fb95d");
  const [role, setRole] = useState<RoleType[]>([]);
  const [permissions, setPermission] = useState<PermissionType[]>([]);

  const RoleForm = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
  });
  const RoleUpdateForm = useForm<z.infer<typeof RoleUpdateSchema>>({
    resolver: zodResolver(RoleUpdateSchema),
    defaultValues: {
      color: color.hex,
    },
  });

  const onSubmitUpdate = async (data: z.infer<typeof RoleSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/role", {
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
      setRoleUpdate(false);
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
      const response = await fetch("/api/role", {
        method: "DELETE",
        body: JSON.stringify(RoleUpdateForm.getValues("uuid")),
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

  const onSubmit = async (data: z.infer<typeof RoleSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/role", {
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

  async function fetchPermission() {
    const res = await fetch("/api/permission");
    const data = await res.json();
    setPermission(data.message);
  }
  async function fetchRole() {
    const res = await fetch("/api/role");
    const data = await res.json();
    setRole(data.message);
  }

  useEffect(() => {
    fetchRole();
    fetchPermission();
  }, [loading]);

  const columns: ColumnDef<RoleType>[] = [
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
        const amount = String(row.getValue("uuid"));
        return (
          <div className=" flex flex-row">
            <HoverCard>
              <div className="truncate w-[70px]">
                <HoverCardTrigger>{amount}</HoverCardTrigger>
              </div>
              <HoverCardContent className="w-[350px] text-center rounded-xl">
                {amount}
              </HoverCardContent>
            </HoverCard>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => <p className="text-start">Name</p>,
      cell: ({ row }) => {
        const names = String(row.getValue("name"));

        return (
          <div className={`p-1 rounded-sm text-start flex flex-row`}>
            <div>{names}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "color",
      header: () => <p className="text-start">Color</p>,
      cell: ({ row }) => {
        const names = String(row.getValue("color"));

        return (
          <div
            className={`p-1 rounded-sm text-start flex flex-row items-center justify-center`}
            style={{ backgroundColor: names }}
          >
            {names}
          </div>
        );
      },
    },
    {
      accessorKey: "permission",
      header: () => <p>Permission</p>,
      cell: ({ row }) => {
        const permissions = row.getValue("permission") as string[];
        return (
          <HoverCard>
            <HoverCardTrigger>
              <ScrollArea className="h-10 p-2">
                <div className="flex flex-col space-y-1">
                  {permissions.map((perm, idx) => (
                    <span key={idx} className="text-sm break-words">
                      {perm}
                    </span>
                  ))}
                </div>
              </ScrollArea>
            </HoverCardTrigger>
            <HoverCardContent className="w-[250px] flex flex-col text-center rounded-xl">
              {permissions.map((perm, idx) => (
                <span key={idx} className="text-sm break-words">
                  {perm}
                </span>
              ))}
            </HoverCardContent>
          </HoverCard>
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
                    RoleUpdateForm.setValue("uuid", row.getValue("uuid"));
                    onDelete();
                  }}
                >
                  Delete Permission
                </DropdownMenuItem>
                {RoleUpdate === false ? (
                  <DropdownMenuItem
                    onClick={() => {
                      setRoleUpdate(true);
                      setColor((prev) => ({
                        ...prev,
                        hex: row.getValue("color"),
                      }));
                      RoleUpdateForm.setValue("name", row.getValue("name"));
                      RoleUpdateForm.setValue("uuid", row.getValue("uuid"));
                    }}
                  >
                    Update Permission
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="flex md:flex-row flex-col w-full">
        <div className="flex flex-col w-full lg:w-[50%] lg:max-w-[50%] justify-start pt-5 items-center">
          {RoleUpdate == false ? (
            <Form {...RoleForm}>
              <form
                onSubmit={RoleForm.handleSubmit(onSubmit)}
                className="flex flex-col w-full lg:px-5 gap-2"
              >
                <FormField
                  control={RoleForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col basis-3 w-full justify-center">
                      <FormLabel>Name</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <Input placeholder="Role Name" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={RoleForm.control}
                  name="color"
                  render={() => (
                    <FormItem className="flex flex-col basis-3 w-full justify-center">
                      <FormLabel>Color</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <Popover>
                          <PopoverTrigger
                            className={`flex border-[1px] p-2 rounded-lg`}
                            style={{ backgroundColor: color.hex }}
                          >
                            {color.hex}
                          </PopoverTrigger>
                          <PopoverContent className="bg-zinc-900 w-full">
                            <ColorPicker
                              hideInput={["rgb", "hsv"]}
                              color={color}
                              onChange={(color) => {
                                setColor(color);
                              }}
                              onChangeComplete={(e) => {
                                RoleForm.setValue("color", e.hex);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={RoleForm.control}
                  name="permission"
                  render={() => (
                    <FormItem className="flex flex-col basis-3 w-full justify-center">
                      <FormLabel>Permission</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <MultiSelect
                          onValueChange={(e) => {
                            RoleForm.setValue("permission", e);
                          }}
                          options={permissions}
                          placeholder="Select Permission"
                          className="w-full md:w-20rem p-1 pl-2 rounded-md border "
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
                  {loading ? "loading.." : "Create Role"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...RoleUpdateForm}>
              <form
                onSubmit={RoleUpdateForm.handleSubmit(onSubmitUpdate)}
                className="flex flex-col w-full lg:px-5 gap-2"
              >
                <FormField
                  control={RoleUpdateForm.control}
                  name="name"
                  render={({}) => (
                    <FormItem className="flex flex-col basis-3 w-full justify-center">
                      <FormLabel>Name</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <Input
                          placeholder="Role Name"
                          defaultValue={RoleUpdateForm.getValues("name")}
                          onChange={(e) => {
                            RoleUpdateForm.setValue("name", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={RoleUpdateForm.control}
                  name="color"
                  render={() => (
                    <FormItem className="flex flex-col basis-3 w-full justify-center">
                      <FormLabel>Color</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <Popover>
                          <PopoverTrigger
                            className={`flex border-[1px] p-2 rounded-lg`}
                            style={{ backgroundColor: color.hex }}
                          >
                            {color.hex}
                          </PopoverTrigger>
                          <PopoverContent className="bg-zinc-900 w-full">
                            <ColorPicker
                              hideInput={["rgb", "hsv"]}
                              color={color}
                              onChange={(color) => {
                                setColor(color);
                              }}
                              onChangeComplete={(e) => {
                                RoleUpdateForm.setValue("color", e.hex);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={RoleUpdateForm.control}
                  name="permission"
                  render={() => (
                    <FormItem className="flex flex-col basis-3 w-full justify-center">
                      <FormLabel>Permission</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <MultiSelect
                          onValueChange={(e) => {
                            RoleUpdateForm.setValue("permission", e);
                          }}
                          options={permissions}
                          defaultValue={RoleUpdateForm.getValues("permission")}
                          placeholder="Select Permission"
                          className="w-full md:w-20rem p-1 pl-2 rounded-md"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-2">
                  <Button
                    type="submit"
                    className="rounded-md pt-15 w-[80%]"
                    disabled={loading}
                  >
                    {loading ? "loading.." : "Update Role"}
                  </Button>
                  <Button
                    onClick={() => setRoleUpdate(false)}
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
          <div className="flex flex-col size-full bg-card rounded-md mt-5 justify-center items-center">
            <p
              className="flex p-1 rounded-md"
              style={{ backgroundColor: color.hex }}
            >
              {RoleUpdate != true
                ? RoleForm.getValues("name")
                : RoleUpdateForm.getValues("name")}
            </p>
          </div>
        </div>
      </div>
      <DataTable data={role} searchBy="name" columns={columns} />
    </>
  );
}
