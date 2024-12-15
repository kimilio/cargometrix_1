import React, { useState, useEffect } from 'react';
import { Calculator, History, Ship } from 'lucide-react';
import { CalculatorForm } from './components/CalculatorForm';
import { CalculationHistory } from './components/CalculationHistory';
import { CalculationResults } from './components/CalculationResults';
import { calculateResults } from './utils/calculations';
import { initStorage, saveCalculation, getCalculations, deleteCalculation } from './utils/storage';
import { Box, CalculationResult } from './types';

function App() {
  const [calculations, setCalculations] = useState<CalculationResult[]>([]);
  const [currentResult, setCurrentResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    initStorage();
    loadCalculations();
  }, []);

  const loadCalculations = () => {
    const results = getCalculations();
    setCalculations(results);
  };

  const handleCalculate = (
    supplier: string,
    box: Box,
    totalPieces: number,
    containerType: string,
    practicalCapacity: number
  ) => {
    const result = calculateResults(supplier, box, totalPieces, containerType, practicalCapacity);
    setCurrentResult(result);
    saveCalculation(result);
    loadCalculations();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτόν τον υπολογισμό;')) {
      deleteCalculation(id);
      loadCalculations();
    }
  };

  const handleView = (id: number) => {
    const calculation = calculations.find(calc => calc.id === id);
    if (calculation) {
      setCurrentResult(calculation);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Ship className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CargoMetrix</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calculator className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Υπολογιστής Container
              </h2>
            </div>
            <CalculatorForm onCalculate={handleCalculate} />
            {currentResult && (
              <div className="mt-8">
                <CalculationResults result={currentResult} />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <History className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Ιστορικό Υπολογισμών
              </h2>
            </div>
            <CalculationHistory
              calculations={calculations}
              onView={handleView}
              onEdit={handleView}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}