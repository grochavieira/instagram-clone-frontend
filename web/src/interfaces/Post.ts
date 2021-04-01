export interface Caption {
  body: string;
  createdAt: string;
}

export interface Comment {
  body: string;
  username: string;
  followingUsername: string;
  profilePhotoURL: string;
  createdAt: string;
}

export interface Like {
  username: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  postUrl: string;
  publicId: string;
  user: string;
  username: string;
  createdAt: string;
  caption: Caption;
  comments: Comment[];
  likes: Like[];
}
