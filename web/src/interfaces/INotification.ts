export default interface INotification {
  _id: string;
  username: string;
  followingUsername?: string;
  postId?: string;
  profilePhotoURL: string;
  body: string;
  wasRead: boolean;
  notificationType: string;
  createdAt: Date;
}
