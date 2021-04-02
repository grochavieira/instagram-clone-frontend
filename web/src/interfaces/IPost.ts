export interface ICaption {
  body: string;
  createdAt: string;
}

export interface IComment {
  body: string;
  username: string;
  followingUsername: string;
  profilePhotoURL: string;
  createdAt: string;
}

export interface ILike {
  username: string;
  createdAt: string;
}

export default interface IPost {
  _id: string;
  postUrl: string;
  publicId: string;
  user: string;
  username: string;
  createdAt: string;
  caption: ICaption;
  comments: IComment[];
  likes: ILike[];
}
