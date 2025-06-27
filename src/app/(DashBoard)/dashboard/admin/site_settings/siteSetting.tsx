"use client";

import "react-color-palette/css";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UpdateSettingSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Site_Form() {
  const [loading, setLoading] = useState(false);
  const [sideData, setSiteData] = useState<SiteSettingsType[]>([]);

  const SiteForm = useForm<z.infer<typeof UpdateSettingSchema>>({
    resolver: zodResolver(UpdateSettingSchema),
  });

  const onSubmit = async (data: z.infer<typeof UpdateSettingSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/site_settings", {
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

  async function fetchSiteSettings() {
    const res = await fetch("/api/site_settings");
    const data = await res.json();
    setSiteData(data.message);
  }

  useEffect(() => {
    fetchSiteSettings();
  }, [loading]);
  
  return (
    <div className="flex justify-start pt-5 items-center">
      <div className="flex w-full">
        <Form {...SiteForm}>
          <form
            onSubmit={SiteForm.handleSubmit(onSubmit)}
            className="flex flex-col w-full lg:px-5 gap-2"
          >
            <div className="flex flex-row gap-10">
              <div className="flex flex-col w-[50%] gap-4">
                <FormField
                  control={SiteForm.control}
                  name="name"
                  render={({}) => (
                    <FormItem className="flex flex-col w-full justify-center">
                      <FormLabel>Name</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <Input
                          placeholder="Site Name"
                          defaultValue={sideData.map((data) => data.name)}
                          onChange={(e) => {
                            SiteForm.setValue("name", e.target.value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={SiteForm.control}
                  name="description"
                  render={({}) => (
                    <FormItem className="flex flex-col w-full justify-center">
                      <FormLabel>Description</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <Input
                          placeholder="Site Name"
                          defaultValue={sideData.map(
                            (data) => data.description,
                          )}
                          onChange={(e) => {
                            SiteForm.setValue("description", e.target.value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-[50%] gap-4">
                <div className="flex flex-row w-full gap-2">
                  <FormField
                    control={SiteForm.control}
                    name="maintenanceMessage"
                    render={({}) => (
                      <FormItem className="flex flex-col w-full justify-center">
                        <FormLabel>Maintenance Message</FormLabel>
                        <FormControl className="flex items-center w-full rounded-md">
                          <Input
                            placeholder="Maintenance Message"
                            defaultValue={sideData.map(
                              (data) => data.maintenanceMessage,
                            )}
                            onChange={(e) => {
                              SiteForm.setValue(
                                "maintenanceMessage",
                                e.target.value,
                              );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={SiteForm.control}
                    name="maintenance"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[50%] justify-end items-center">
                        <FormLabel>
                          Maintenance -{" "}
                          {`${sideData.map((data) => data.maintenance)}`}
                        </FormLabel>
                        <FormControl className="flex items-center rounded-md">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={SiteForm.control}
                  name="address"
                  render={({}) => (
                    <FormItem className="flex flex-col w-full justify-center">
                      <FormLabel>Work Address</FormLabel>
                      <FormControl className="flex items-center w-full rounded-md">
                        <Input
                          placeholder="Work Address"
                          defaultValue={sideData.map((data) => data.address)}
                          onChange={(e) => {
                            SiteForm.setValue("address", e.target.value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <hr className="my-5" />
            <Button
              type="submit"
              className="rounded-md mt-4 lg:pt-15"
              disabled={loading}
            >
              {loading ? "loading.." : "Save Settings"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
