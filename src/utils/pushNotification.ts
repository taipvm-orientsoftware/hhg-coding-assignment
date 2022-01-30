import { notification } from 'antd';
import { IconType } from 'antd/lib/notification';

export default function pushNotification(
  message: string,
  type: IconType
): void {
  notification[type]({
    message,
    duration: 2,
    placement: 'topRight',
  });
}
