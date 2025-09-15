export interface Machine {
  lineName: string;
  name: string;
  faunctionality: string;
  ratedSpeed: number;
  lineId: number;
  uid: number;
  unitOfSpeed: number;
  building: null;
  floor: null;
  room: null;
  id: number;
}

export interface machineData {
  name: string;
  faunctionality: string;
  ratedSpeed: number;
  lineId: number;
  uid: string;
  unitOfSpeed: string;
  building: string;
  floor: string;
  room: string;
  id: number;
  lineName: string;
  factoryId: number;
}

export interface lineS {
  id: number;
  name: string;
  number: number;
  type: string;
  factoryId: number;
}

export interface roles {
  id: number;
  name: string;
}

export interface IFactory {
  type: string;
  value: string;
}
export interface IShift {
  shift: string;
  from: string;
  to: string;
}
export interface IAllUSers {
  id: string;
  userName: string;
  email: string;
  roleName: string;
  phoneNumber: string;
  isDeleted: boolean;
  creationDate: string;
}
// "lineName": "E1_Cep_L2",
// "name": "E1_Cep_L2_Cart",
// "faunctionality": "Cart",
// "ratedSpeed": null,
// "lineId": 2,
// "uid": null,
// "unitOfSpeed": null,
// "building": null,
// "floor": null,
// "room": null,
// "id": 0
