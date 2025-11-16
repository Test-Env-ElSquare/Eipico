export interface MainDashBoard {
  factoryProduction: factoryProduction[];
  lineProduction: lineProduction[];
}

//interface for factoryProduction
export interface factoryProduction {
  name: string;
  y: number;
  drilldown: string;
  toalenergy: number;
  eur: number;
}

//interface for lineProduction
export interface lineProduction {
  name: string;
  id: string;
  data: [string, number][];
}

//interface for OEEDashobard
export interface OEEDashobard {
  days: string[];
  oee: number[];
}

//energy EnergyConsumption
// export interface EnergyConsumption {
//   energySeries : number[],
//   energyTimeSeries : string[],
//   totalEnergyConsumption : number
// }
export interface GetPartsPerDays {
  fillersSeries: number[];
  fillersTimeSeries: string[];
  totalFillersCount: number;
  factoryProduction: factoryProduction[];
}
