export interface  MachineState{
 machineName: string
lineId: number
timeStamp: string
shiftStartTime: string
machine_State: string
beacon_Status: string
id: number
}

export interface MachineTag{
  machine: string,
  shiftStartTime: string,
  speed: number,
  timeStamp: string,
  count: number,
  state: number,
  fault: number
}


export interface MachineTagProperties{
  displayName: string,
  columnName: string,
  chartType: string,
  id: number
}

// machineName: string
// lineId: number
// timeStamp: string
// shiftStartTime: string
// machine_State: string
// beacon_Status: string
// id: number
