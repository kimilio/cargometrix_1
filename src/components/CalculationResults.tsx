import React from 'react';
import { CalculationResult } from '../types';

interface CalculationResultsProps {
  result: CalculationResult;
}

export function CalculationResults({ result }: CalculationResultsProps) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold mb-2">Πληροφορίες Παραγγελίας</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Προμηθευτής</p>
            <p className="font-medium">{result.supplier}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Διαστάσεις Κιβωτίου</p>
            <p className="font-medium">
              {result.box.width}x{result.box.height}x{result.box.depth} cm
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Όγκος Κιβωτίου</p>
            <p className="font-medium">{result.boxVolume.toFixed(6)} CBM</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Συνολικά Τεμάχια</p>
            <p className="font-medium">{result.totalPieces}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Αποτελέσματα Container</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Απαιτούμενα Containers</p>
            <p className="font-medium text-blue-600">
              {result.containersNeeded}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Αποδοτικότητα Χώρου</p>
            <p className="font-medium">
              {result.spaceUtilization.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Κιβώτια ανά Container</p>
            <p className="font-medium">
              {result.actualBoxesPerContainer}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Τελευταίο Container</p>
            <p className="font-medium">
              {result.lastContainerUtilization.toFixed(2)}% πληρότητα
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Σύγκριση Τύπων Container</h3>
        <div className="grid grid-cols-3 gap-4">
          {result.containerComparisons.map((comp) => (
            <div
              key={comp.type}
              className="p-4 border rounded-lg bg-gray-50"
            >
              <p className="font-medium">{comp.type}</p>
              <p className="text-sm text-gray-600">
                {comp.containersNeeded} containers
              </p>
              <p className="text-sm text-gray-600">
                {comp.utilization.toFixed(2)}% πληρότητα
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}