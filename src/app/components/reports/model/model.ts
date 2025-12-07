export interface HistoricalDashobardsPerHour {
  count: number;
  hour: number;
  availability: number;
  performance?: number;
  quality: number;
  oee: number;
}

export interface BykonState {
  machineName: string;
  state: string;
  timeStamp: string;
  lineId: number;
}

export interface EnergyMachineState {
  name: string;
  status: string;
  timeStamp: string;
}

export interface Transformars {
  transformerName: string;
  lineTransformers: [];
  id: number;
}

export interface TransformersRead {
  sourceId: string;
  shiftStartTime: string;
  v1: number;
  v2: number;
  v3: number;
  i1: number;
  i2: number;
  i3: number;
  pF1: number;
  pF2: number;
  pF3: number;
  papp1: number;
  papp2: number;
  papp3: number;
  pact1: number;
  pact2: number;
  pact3: number;
  preact1: number;
  preact2: number;
  preact3: number;
  thDv1: number;
  thDv2: number;
  thDv3: number;
  thDi1: number;
  thDi2: number;
  thDi3: number;
  fault: number;
  diffEnergy1: number;
  diffEnergy2: number;
  diffEnergy3: number;
  energy1: number;
  energy2: number;
  energy3: number;
  id: number;
  machine?: any;
  totalEnergyConsumption: number;
}

export interface TransformersReads {
  consumption: number;
  count: number;
  reads: TransformersRead[];
}
