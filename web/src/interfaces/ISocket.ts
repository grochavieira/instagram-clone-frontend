import IPost from "./IPost";
import IUser from "./IUser";
import INotification from "./INotification";

export interface ISocketPostProps {
  post: IPost;
}

export interface ISocketNotificationProps {
  notification: INotification;
}

export interface ISocketFollowingProps {
  user: IUser;
  friendUser: IUser;
}
