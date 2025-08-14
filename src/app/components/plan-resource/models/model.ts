export interface GetStoppagePlan{
  id: number,
  factoryId: number,
  reasonId: number,
  subReasonId: number,
  reason: string,
  subReason: string,
  lineId: string,
  startTime:string ,
  endTime: string,
  factoryName?: string,
  lineName?: string,
}

export interface Machine{
  machineID: string
  name: string
}

export interface MainReasons{
  id: number
  stop_Name: string
}

export interface SubReasons{
  id: number
  subReasonName: string
  mainReasonId: number
  mainReason: null
}



export interface StoppageReasons{
  name: string,
  stoppageSubReasons: null,
  id: number
}

export interface GetAllSubReasons{
  name: string,
  id : number
}
