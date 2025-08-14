export interface DashBoardData {
  kpi: Kpi
  production: Production
  power: Power
  object: Object[][]
  timeLine: TimeLine[]
}

export interface Kpi {
  sourceId: string
  factory: string
  effectivness: number
  performance: number
  availability: number
  shiftStartTime: string
}

export interface Production {
  sourceId: string
  factory: string
  picks: number
  totalProductionHours: number
  avgSpeed: number
  no_Stops: number
  avgStopDuration: number
  orders: number
  shiftStartTime: string
  timeStamp: string
}

export interface Power {
  sourceId: string
  factory: string
  energyConsumption: number
  maxPowerFactor: number
  thDi: number
  thDv: number
  shiftStartTime: string
}

export interface Stops {
  s1_StopDuration: S1StopDuration
  s2_StopDuration: S2StopDuration
  s3_StopDuration: S3StopDuration
  s4_StopDuration: S4StopDuration
  avg_s1_StopDuration: AvgS1StopDuration
  avg_s2_StopDuration: AvgS2StopDuration
  avg_s3_StopDuration: AvgS3StopDuration
  avg_s4_StopDuration: AvgS4StopDuration
}

export interface S1StopDuration {
  name: string
  y: number
  direction: string
}

export interface S2StopDuration {
  name: string
  y: number
  direction: string
}

export interface S3StopDuration {
  name: string
  y: number
  direction: string
}

export interface S4StopDuration {
  name: string
  y: number
  direction: string
}

export interface AvgS1StopDuration {
  name: string
  y: number
  direction: string
}

export interface AvgS2StopDuration {
  name: string
  y: number
  direction: string
}

export interface AvgS3StopDuration {
  name: string
  y: number
  direction: string
}

export interface AvgS4StopDuration {
  name: string
  y: number
  direction: string
}

export interface TimeLine {
  id: number
  signalId: string
  order: number
  factory: string
  stateStartTime: string
  stateEndTime: string
  state: string
  timeStamp: string
  reasonOfFail: any
  shiftStartTime: string
}
