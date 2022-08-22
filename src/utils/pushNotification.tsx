import { NotificationProps, showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

type NotificationType = 'default' | 'success' | 'error';
type NotificationStatus = Record<NotificationType, Pick<NotificationProps, 'color' | 'icon'>>;

export default function pushNotification(type: NotificationType, message: string): void {
  const notificationStatus: NotificationStatus = {
    default: {
      color: 'blue',
      icon: undefined
    },
    success: {
      color: 'teal',
      icon: <IconCheck />
    },
    error: {
      color: 'red',
      icon: <IconX />
    }
  };

  return showNotification({
    autoClose: 2000,
    message,
    color: notificationStatus[type].color,
    icon: notificationStatus[type].icon
  });
}
