import React from 'react';
import { Calculation } from '../types';

interface CalculationHistoryProps {
  calculations: Calculation[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function CalculationHistory({
  calculations,
  onView,
  onEdit,
  onDelete
}: CalculationHistoryProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ημερομηνία
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Προμηθευτής
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Διαστάσεις
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Συνολικά Τεμάχια
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Containers
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ενέργειες
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {calculations.map((calc) => (
            <tr key={calc.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(calc.calculationDate).toLocaleString('el-GR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{calc.supplier}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {`${calc.box.width}x${calc.box.height}x${calc.box.depth}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{calc.totalPieces}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {calc.containersNeeded}
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  onClick={() => onView(calc.id!)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Προβολή
                </button>
                <button
                  onClick={() => onEdit(calc.id!)}
                  className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
                >
                  Επεξεργασία
                </button>
                <button
                  onClick={() => onDelete(calc.id!)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Διαγραφή
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}