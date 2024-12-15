import React, { useState } from 'react';
import { Box } from '../types';

interface CalculatorFormProps {
  onCalculate: (
    supplier: string,
    box: Box,
    totalPieces: number,
    containerType: string,
    practicalCapacity: number
  ) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [supplier, setSupplier] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [piecesPerBox, setPiecesPerBox] = useState('');
  const [totalPieces, setTotalPieces] = useState('');
  const [containerType, setContainerType] = useState('20ft');
  const [practicalCapacity, setPracticalCapacity] = useState('90');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onCalculate(
      supplier,
      {
        width: parseFloat(width),
        height: parseFloat(height),
        depth: parseFloat(depth),
        piecesPerBox: parseInt(piecesPerBox)
      },
      parseInt(totalPieces),
      containerType,
      parseInt(practicalCapacity) / 100
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Προμηθευτής
        </label>
        <input
          type="text"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Πλάτος (cm)
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ύψος (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Βάθος (cm)
          </label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Τεμάχια/Κιβώτιο
          </label>
          <input
            type="number"
            value={piecesPerBox}
            onChange={(e) => setPiecesPerBox(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Συνολικά Τεμάχια
          </label>
          <input
            type="number"
            value={totalPieces}
            onChange={(e) => setTotalPieces(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Τύπος Container
          </label>
          <select
            value={containerType}
            onChange={(e) => setContainerType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="20ft">20ft</option>
            <option value="40ft">40ft</option>
            <option value="40ft High Cube">40ft High Cube</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Πρακτική Χωρητικότητα
          </label>
          <select
            value={practicalCapacity}
            onChange={(e) => setPracticalCapacity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="90">90%</option>
            <option value="85">85%</option>
            <option value="80">80%</option>
            <option value="75">75%</option>
            <option value="70">70%</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Υπολογισμός
      </button>
    </form>
  );
}