export interface Auth {}
export interface IProfile {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  roleName: string;
  areas: Area[];
  claims: Claim[];
  isDeleted: boolean;
}

export interface Area {
  name: string;
}

export interface Claim {
  type: string;
  value: string;
}
export interface UpdateAdminProfile {
  userId: string;
  roles: string[];
  claims: string[];
  areaIds: number[];
}
export interface UpdateUserProfile {
  userId: string;
  username: string;
  email: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
}
export interface Claims {
  type: string;
  value: string;
}
export interface updateUserProfileByAdmin {
  userId: string;
  roles: string[];
  claims: string[];
  areaIds: number[];
}
export interface IRole {
  id: number;
  name: string;
}
export interface Iclamis {
  id: number;
  claimName: string;
}
export interface IFPassword {
  email: string;
}
export interface ISendOtp {
  email: string;
  otp: string;
}
export interface IRPAssword {
  email: string;
  newPassword: string;
}
export interface IRole {
  text: string;
}

export interface IArea {
  value: number;
  text: string;
}

export interface IRoleAreaResponse {
  roles: IRole[];
  areas: IArea[];
}
