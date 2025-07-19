interface UserInfoModel {
  _id: string;
  username: string;
  email: string;
  contacts: any[];
  profilePicture: string;
  chatRooms: any[];
  isVerified: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export { UserInfoModel };
