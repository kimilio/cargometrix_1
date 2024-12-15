export interface Box {
  width: number;
  height: number;
  depth: number;
  piecesPerBox: number;
}

export interface Calculation {
  id?: number;
  supplier: string;
  box: Box;
  totalPieces: number;
  containerType: string;
  practicalCapacity: number;
  containersNeeded: number;
  spaceUtilization: number;
  calculationDate: string;
}

export interface ContainerSpecs {
  length: number;
  width: number;
  height: number;
  volume: number;
  maxWeight: number;
  doorWidth: number;
  doorHeight: number;
}

export interface CalculationResult extends Calculation {
  boxVolume: number;
  totalBoxes: number;
  totalVolume: number;
  containerVolume: number;
  theoreticalBoxesPerContainer: number;
  actualBoxesPerContainer: number;
  lastContainerBoxes: number;
  lastContainerUtilization: number;
  unusedSpaceLastContainer: number;
  optimization: BoxOptimization;
  containerComparisons: ContainerComparison[];
}

export interface BoxOptimization {
  dimensions: [number, number, number];
  improvement: number;
  containersSaved: number;
  newBoxesPerContainer: number;
  newContainers: number;
  currentContainers: number;
  spaceUtilization: number;
}

export interface ContainerComparison {
  type: string;
  containersNeeded: number;
  utilization: number;
}