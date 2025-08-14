export interface factory {
  name: string;
  location: string;
  id: number;
}

export interface Line{
  name: string;
  number: number;
  type: null;
  factoryId: number;
  id: number;
}

export interface Skus{
  id: number,
  batch: string,
  sku: string | null
}
