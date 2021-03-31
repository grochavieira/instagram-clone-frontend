import { Post } from "./Post";
import { Notification } from "./Notification";

export interface SocketPostProps {
  post: Post;
}

export interface SocketNotificationProps {
  notification: Notification;
}
