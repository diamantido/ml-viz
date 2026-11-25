//import React from "react";

import { useState } from "react";
import Chart from "../components/Chart";
import type { LinearParams, Point } from "../types";

interface DataButtonProps {
  onUpdateData: (newData: Point[]) => void;
  onUpdateFit: (newFit: LinearParams) => void;
  onUpdateError: (newError: number | undefined) => void;
}

interface FitButtonProps {
  data?: Point[];
  fit?: LinearParams;
  onUpdateError: (newError: number) => void;
}

const DataButton = ({
  onUpdateData,
  onUpdateFit,
  onUpdateError,
}: DataButtonProps) => {
  return (
    <button
      className="counter"
      onClick={() => {
        const points: Point[] = [];
        for (let i = 0; i < 10; i++) {
          const x = Math.random() * 10;
          const y = Math.random() * 10;
          points.push({ x: x, y: y });
        }
        onUpdateData(points);
        const slope = (Math.random() - 0.5) * 10;
        const intercept = Math.random() * 10;
        onUpdateFit({ slope: slope, intercept: intercept });
        onUpdateError(undefined);
      }}
    >
      Randomize
    </button>
  );
};

const FitButton = ({ onUpdateError, data, fit }: FitButtonProps) => {
  return (
    <button
      className="counter"
      onClick={() => {
        if (data && fit) {
          let total = 0;
          data.forEach((d, _) => {
            total += Math.abs(d.x * fit.slope + fit.intercept);
          });
          onUpdateError(total);
        }
      }}
    >
      Fit Data
    </button>
  );
};

const LinearRegression = () => {
  const [data, setData] = useState<Point[]>([]);
  const [fit, setFit] = useState<LinearParams>();
  const [error, setError] = useState<number>();

  return (
    <div>
      <h1>Linear Regression</h1>
      <p>This is the Linear Regression page of ML-Viz.</p>
      <Chart
        width={400}
        height={400}
        data={data ?? []}
        fit={fit}
        error={error}
      />
      <div className="flex justify-center gap-3">
        <DataButton
          onUpdateData={(newData) => setData(newData)}
          onUpdateFit={(newFit) => setFit(newFit)}
          onUpdateError={(newError) => setError(newError)}
        />
        <FitButton
          data={data}
          fit={fit}
          onUpdateError={(newError) => setError(newError)}
        />
      </div>
    </div>
  );
};

export default LinearRegression;
