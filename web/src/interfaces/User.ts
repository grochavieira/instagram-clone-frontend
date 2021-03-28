export default interface User {
  _id: string;
  name: string;
  email: string;
  profilePhoto: {
    publicId: string;
    url: string;
  };
  username: string;
}
