export interface fillers {
  count: number;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
  avgSpeed: number;
  qreject: number;
  total: number;
  weightedavgspeed: number;
  equevilantAVGSpeed: number;
}
export interface timelineData {
  x: string;
  y: number[];
  fillColor: string;
}

export interface timelineDatatest {
  x: string;
  y: string[];
  fillColor: string;
}
export interface timeline {
  name: string;
  testdata: timelineDatatest[];
}

export interface skus {
  skuCode: string;
  timeStamp: string;
  jobOrderId: string;
  machineId: number;
  batchId: string;
  skuName: string;
  activationDate?: string;
  finishingDate?: string;
  count?: number;
}

export interface Historical {
  fillers: fillers;
  timeline: timeline[];
  skus: skus[];
  fillersReadsPerDay: fillersReadsPerDay[] | null;
  filler_Per_Hour: vWFillerPerHour[] | null;
  totalEnergyConsumption: number;
  avgPowerFactor: number;
  avgPTHDv: number;
  avgTHDi: number;
}

export interface JobOrderMatairal {
  uid: string;
  materialName: string;
  deviation: number;
  sapweight: string;
  handheldweight: string;
  timeStamp: string;
}

export interface JobOrderDetails {
  room: string;
  scalePair: string;
  machinePair: string;
  activationDate: string;
  finishingDate: string;
  oee: number;
  count: number;
  performance: number;
  availability: number;
  quality: number;
  scale: string;
}

export interface fillersReadsPerDay {
  parts: number;
  pallets: number;
  eur: number;
  quality: number;
  availability: number;
  performance: number;
  oee: number;
  day: string;
  avgSpeed: number;
}

export interface vWFillerPerHour {
  count: number;
  qreject: number;
  hour: number;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
}

//////////////refactor Historical
export interface GetFillerRefactor {
  filerreads: fillers;
  filler_per_Hour: vWFillerPerHour[] | null;
  filerperday: fillersReadsPerDay[] | null;
}

export interface EnergyRefactor {
  totalEnergyConsumption: number;
  avgPowerFactor: number;
  avgPTHDv: number;
  avgTHDi: number;
}

export interface filter {
  shiftFilterid: number;
  selectedFactory: number;
  selectedLine: number;
}
