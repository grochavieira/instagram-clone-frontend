export interface IFriend {
  username: string;
  createdAt: string;
}

export default interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePhoto: {
    publicId: string;
    url: string;
  };
  username: string;
  friends: IFriend[] | [];
  followers: IFriend[] | [];
}
