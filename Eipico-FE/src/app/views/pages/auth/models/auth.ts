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
