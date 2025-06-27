import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./button";

type PasswordFieldProps = {
  name?: string;
  placeholder?: string;
  description?: string | JSX.Element;
};

export function PasswordField({
  name = "password",
  placeholder = "Enter password",
  description,
}: PasswordFieldProps) {
  const { control, getFieldState } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl className="flex flex-row">
            <div className="bg-input rounded-lg">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                placeholder={placeholder}
                className={`bg-transparent border-none ${
                  getFieldState(name).error && "text-destructive"
                }`}
              />
              <Button
                variant={"ghost"}
                type="button"
                className="flex items-center  text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {passwordVisibility ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

/* 
 <FormField
                    control={UserForm.control}
                    name="password"
                    render={({}) => (
                      <FormItem className="flex flex-col w-full justify-center">
                        <FormLabel>Password </FormLabel>
                        <FormControl className="flex items-center w-full rounded-md">
                          <div>
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
*/
