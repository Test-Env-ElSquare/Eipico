 export interface GetAllProductPlans{
     factoryId: number,
     lineId: number,
    day: string,
    skuId: number,
     target: number,
     id: number
     factoryName: string,
     lineName: string,
     skuName:string,
  }


  export interface AddProductPlans
  {
    id: number,
    factoryId: number,
    lineId: number,
    day: string,
    skuName: number,
    target: number
  }

  export interface planShiftMaterialConsumptionsObject{

      factoryId: number,
      lineId: number,
      day:string,
      skuName: number,
      target: number,
      id: number

  }
