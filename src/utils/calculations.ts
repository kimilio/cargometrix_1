import { Box, ContainerSpecs, CalculationResult } from '../types';

const CONTAINER_SPECS: Record<string, ContainerSpecs> = {
  '20ft': {
    length: 5.90,
    width: 2.35,
    height: 2.39,
    volume: 33.2,
    maxWeight: 28280,
    doorWidth: 2.34,
    doorHeight: 2.28
  },
  '40ft': {
    length: 12.03,
    width: 2.35,
    height: 2.39,
    volume: 67.6,
    maxWeight: 30480,
    doorWidth: 2.34,
    doorHeight: 2.28
  },
  '40ft High Cube': {
    length: 12.03,
    width: 2.35,
    height: 2.69,
    volume: 76.4,
    maxWeight: 30480,
    doorWidth: 2.34,
    doorHeight: 2.58
  }
};

export function calculateBoxVolume(box: Box): number {
  return (box.width * box.height * box.depth) / 1000000;
}

export function calculateResults(
  supplier: string,
  box: Box,
  totalPieces: number,
  containerType: string,
  practicalCapacity: number
): CalculationResult {
  const boxVolume = calculateBoxVolume(box);
  const totalBoxes = Math.ceil(totalPieces / box.piecesPerBox);
  const totalVolume = boxVolume * totalBoxes;

  const containerSpecs = CONTAINER_SPECS[containerType];
  const containerVolume = containerSpecs.volume;
  
  const theoreticalBoxesPerContainer = Math.floor(containerVolume / boxVolume);
  const actualBoxesPerContainer = Math.floor(theoreticalBoxesPerContainer * practicalCapacity);
  const containersNeeded = Math.ceil(totalBoxes / actualBoxesPerContainer);
  
  const spaceUtilization = (totalVolume / (containersNeeded * containerVolume)) * 100;

  // Calculate last container details
  const lastContainerBoxes = totalBoxes % actualBoxesPerContainer || actualBoxesPerContainer;
  const lastContainerUtilization = (lastContainerBoxes * boxVolume / containerVolume) * 100;
  const unusedSpaceLastContainer = containerVolume - (lastContainerBoxes * boxVolume);

  // Container comparisons
  const containerComparisons = Object.entries(CONTAINER_SPECS).map(([type, specs]) => {
    const boxesPerCont = Math.floor(specs.volume / boxVolume * practicalCapacity);
    const contsNeeded = Math.ceil(totalBoxes / boxesPerCont);
    const utilization = (totalVolume / (contsNeeded * specs.volume)) * 100;
    
    return {
      type,
      containersNeeded: contsNeeded,
      utilization
    };
  });

  return {
    supplier,
    box,
    totalPieces,
    containerType,
    practicalCapacity,
    containersNeeded,
    spaceUtilization,
    calculationDate: new Date().toISOString(),
    boxVolume,
    totalBoxes,
    totalVolume,
    containerVolume,
    theoreticalBoxesPerContainer,
    actualBoxesPerContainer,
    lastContainerBoxes,
    lastContainerUtilization,
    unusedSpaceLastContainer,
    optimization: optimizeBoxDimensions(box, boxVolume, containerType, totalPieces, containerSpecs, practicalCapacity),
    containerComparisons
  };
}

function optimizeBoxDimensions(
  box: Box,
  boxVolume: number,
  containerType: string,
  totalPieces: number,
  containerSpecs: ContainerSpecs,
  practicalCapacity: number
) {
  // Implementation of box optimization logic
  // This is a placeholder - implement the actual optimization algorithm
  return {
    dimensions: [box.width, box.height, box.depth],
    improvement: 0,
    containersSaved: 0,
    newBoxesPerContainer: 0,
    newContainers: 0,
    currentContainers: 0,
    spaceUtilization: 0
  };
}