import { NotificationProps } from "@mantine/notifications";
import { Check, X, AlertTriangle } from "tabler-icons-react";
interface Options extends NotificationProps {
  type: "info" | "warning" | "error" | "success";
}
export function addStylingToNotification(
  notificationOptions: Options
): NotificationProps {
  switch (notificationOptions.type) {
    case "info":
      break;
    case "success":
      notificationOptions.icon = <Check />;
      notificationOptions.color = "teal";
      break;
    case "error":
      notificationOptions.icon = <X />;
      notificationOptions.color = "red";
      break;
    case "warning":
      notificationOptions.icon = <AlertTriangle />;
      notificationOptions.color = "orange";
      break;
    case "info":
      break;
    default:
      throw TypeError("Invalid notification type");
  }
  // @ts-expect-error
  notificationOptions.type = undefined;
  return notificationOptions;
}
