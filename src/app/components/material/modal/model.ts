// werehouse chart interface
export interface WareHouse{
  keys: string[],
  data: [[string,string, number]]
}

//AllMaterials
export interface Materials {
  name: string
  itemCode?: string
  id: number
}

export interface AllMaterials{
  matarials:Materials[]
  count:number
}
