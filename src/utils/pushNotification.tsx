import { NotificationProps, showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

type NotificationType = 'default' | 'success' | 'error';

export default function pushNotification(type: NotificationType, message: string): void {
  const notificationStatus: Record<NotificationType, Pick<NotificationProps, 'color' | 'icon'>> = {
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
