export interface scada {
  waterConsumption: any
  energyConsumption: any
  machines: Machine[]
  lines: Line[]
}

export interface Machine {
  machineId: number
  machineName: string
  machine_State: string
  beacon_Status: string
  skuCode: any
  skuName: string
  count: number
  avgSpeed: number
  fault: number
  lineId: number
  speed: number
  ratedSpeed : number
}

export interface Line {
  performance: number
  availability: number
  oee: string
  quality: number
  productivity: number
}
