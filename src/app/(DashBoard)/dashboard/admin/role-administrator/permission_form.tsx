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
import { PermissionSchema, PermissionUpdateSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import "react-color-palette/css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

export default function Permission_Form() {
  const [loading, setLoading] = useState(false);
  const [PermissionUpdate, setPermissionUpdate] = useState(false);
  const [permissions, setPermission] = useState<PermissionType[]>([]);
  const PermissionForm = useForm<z.infer<typeof PermissionSchema>>({
    resolver: zodResolver(PermissionSchema),
  });

  const PermissionUpdateForm = useForm<z.infer<typeof PermissionUpdateSchema>>({
    resolver: zodResolver(PermissionUpdateSchema),
  });
  const onSubmitUpdate = async (
    data: z.infer<typeof PermissionUpdateSchema>
  ) => {
    setLoading(true);
    try {
      const response = await fetch("/api/permission", {
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

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/permission", {
        method: "DELETE",
        body: JSON.stringify(PermissionUpdateForm.getValues("uuid")),
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
      toast.error("Internal Error" + err, {
        description: `${err}`,
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof PermissionSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/permission", {
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

  useEffect(() => {
    fetchPermission();
  }, [loading]);

  const columns: ColumnDef<PermissionType>[] = [
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
                    PermissionUpdateForm.setValue("uuid", row.getValue("uuid"));
                    onDelete();
                  }}
                >
                  Delete Permission
                </DropdownMenuItem>
                {PermissionUpdate === false ? (
                  <DropdownMenuItem
                    onClick={() => {
                      setPermissionUpdate(true);
                      console.log(PermissionUpdateForm.getValues());
                      PermissionUpdateForm.setValue(
                        "uuid",
                        row.getValue("uuid")
                      );
                      PermissionUpdateForm.setValue(
                        "name",
                        row.getValue("name")
                      );
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
      <h2 className="text-xl">Permission</h2>
      <hr />
      <div className="flex md:flex-row flex-col gap-2 w-full">
        <div className="flex flex-col lg:w-[50%] lg:max-w-[50%] justify-start pt-5 items-center">
          {PermissionUpdate != true ? (
            <Form {...PermissionForm}>
              <form
                onSubmit={PermissionForm.handleSubmit(onSubmit)}
                className="flex flex-col w-full lg:px-5 gap-2"
              >
                <FormField
                  control={PermissionForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col basis-3 w-full justify-center">
                      <FormLabel>Name</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <Input placeholder="Permission Name" {...field} />
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
          ) : (
            <Form {...PermissionUpdateForm}>
              <form
                onSubmit={PermissionUpdateForm.handleSubmit(onSubmitUpdate)}
                className="flex flex-col w-full lg:px-5 gap-2"
              >
                <FormField
                  control={PermissionUpdateForm.control}
                  name="name"
                  render={({ }) => (
                    <FormItem className="flex flex-col basis-3 w-full justify-center">
                      <FormLabel>Name Update</FormLabel>

                      <FormControl className="flex items-center w-full rounded-md">
                        <Input
                          placeholder="Permission Name"
                          defaultValue={PermissionUpdateForm.getValues("name")}
                          onChange={(e) => {
                            PermissionUpdateForm.setValue(
                              "name",
                              e.target.value
                            );
                          }}
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
                    {loading ? "loading.." : "Update Permission"}
                  </Button>
                  <Button
                    onClick={() => setPermissionUpdate(false)}
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
          <div className="flex flex-col h-20 bg-card rounded-md mt-5 justify-center items-center w-full">
            <p className="flex truncate max-w-[30%]">
              {PermissionUpdate != true
                ? PermissionForm.getValues("name")
                : PermissionUpdateForm.getValues("name")}
            </p>
          </div>
          <DataTable data={permissions} columns={columns} />
        </div>
      </div>
    </>
  );
}
