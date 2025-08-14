export interface Batch {
  batchname: string;
  skucode: string;
  skuname: string;
  joborder: string;
  timestamp: string;
}

export interface BatchMatarials {
  uid: string;
  name: string;
  itemcode: string;
  machinepairstatus: number;
  scalepairingstatus: number;
  isSpilted: number;
}

export interface scaleDetails {
  scaleName?: string;
  timestamp?: string;
  weight?: number;
  numperOfUnits?: number;
  weightTotal?: number;
  pairingTime: string;
  detilsSplit?: scaleDetailsDetailsSplit[];
}

export interface scaleDetailsDetailsSplit {
  weight: number;
  count: number;
}

export interface machineLoadDetails {
  skuname: string;
  timestamp: string;
  shiftstarttime: string;
  machinename: string;
}

export interface pariedBatchesData {
  sapOrderId: number;
  skuCode: string;
  skuName: string;
  batch: string;
  timeStamp: string;
  machineName: string;
}
export interface PairedBatches {
  batches: pariedBatchesData[];
  count?: number;
}
