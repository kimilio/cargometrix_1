import { Calculation, CalculationResult } from '../types';

const STORAGE_KEY = 'cargometrix_calculations';

export function initStorage(): void {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

export function saveCalculation(calculation: CalculationResult): void {
  const calculations = getCalculations();
  const newCalculation = {
    ...calculation,
    id: Date.now(), // Use timestamp as ID
    calculationDate: new Date().toISOString()
  };
  calculations.unshift(newCalculation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(calculations));
}

export function getCalculations(): CalculationResult[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function deleteCalculation(id: number): void {
  const calculations = getCalculations();
  const filtered = calculations.filter(calc => calc.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function updateCalculation(id: number, calculation: CalculationResult): void {
  const calculations = getCalculations();
  const index = calculations.findIndex(calc => calc.id === id);
  if (index !== -1) {
    calculations[index] = { ...calculation, id };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(calculations));
  }
}