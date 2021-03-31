export interface Notification {
  _id: string;
  username: string;
  postId: string;
  profilePhotoURL: string;
  body: string;
  wasRead: boolean;
  createdAt: Date;
}
