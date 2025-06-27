"use client";

import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * 🔔 Notification System - Wrapper around Sonner Toast API
 *
 * Easy-to-use function for showing toast notification with multiple styles.
 * Keeps notifications consistent across the app
 *
 * @function info - Shows an info notification (default style)
 *
 * @function success - Show a success notification (after a from is submitted)
 *
 * @function error - Show an error notification (on request failure)
 *
 * @function warning - show a warning notification (for incomplete data )
 *
 */

const customIcons = {
  success: <CircleCheck />,
  warning: <CircleAlert />,
  error: <CircleX />,
  info: <Info />,
};
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={customIcons}
      toastOptions={{
        classNames: {
          error:
            "group toast group-[.toaster]:bg-error group-[.toaster]:shadow-error/25 group-[.toaster]:hover:bg-error/90 group-[.toaster]:shadow-lg group-[.toaster]:transition-all",
          warning:
            "group toast group-[.toaster]:bg-warning group-[.toaster]:shadow-warning/25 group-[.toaster]:hover:bg-warning/90 group-[.toaster]:shadow-lg group-[.toaster]:transition-all",
          success:
            "group toast group-[.toaster]:bg-success  group-[.toaster]:shadow-success/25 group-[.toaster]:hover:bg-success/90 group-[.toaster]:shadow-lg group-[.toaster]:transition-all",
          info: "group toast group-[.toaster]:bg-card group-[.toaster]:border-primary/65 group-[.toaster]:shadow-primary/25 group-[.toaster]:hover:bg-primary/10 group-[.toaster]:shadow-lg group-[.toaster]:transition-all",
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:gap-3 group-[.toaster]:flex group-[.toaster]:items-center group-[.toaster]:",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
