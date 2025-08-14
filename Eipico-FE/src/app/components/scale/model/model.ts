export interface Rooms {
  scaleid: number
  scalename: string
}


// export interface ScaleReads {
//   batch?: string
//   uid: string
//   matarialname?: string
//   weight: number
//   timestamp: string
// }

export interface ScaleReads {
  scaleread: ScalereadData[]
  count: number
}

export interface ScalereadData {
  batch: string
  uid: string
  matarialname: string
  weight: number
  timestamp: string
}
