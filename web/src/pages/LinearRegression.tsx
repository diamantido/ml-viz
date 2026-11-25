//import React from "react";

import { useState } from "react";
import Chart from "../components/Chart";
import type { LinearParams, Point } from "../types";

const LinearRegression = () => {
  const [data, setData] = useState<Point[]>([]);
  const [fit, setFit] = useState<LinearParams>();
  const [error, setError] = useState<number>();

  const randomize = (n: number) => {
    const points: Point[] = [];
    for (let i = 0; i < n; i++) {
      const x = Math.random() * 10;
      const y = Math.random() * 10;
      points.push({ x: x, y: y });
    }
    setData(points);
  };

  const DataButton = () => {
    return (
      <button
        className="counter"
        onClick={() => {
          randomize(10);
          fitData();
        }}
      >
        Randomize
      </button>
    );
  };

  const fitData = () => {
    const slope = (Math.random() - 0.5) * 10;
    const intercept = Math.random() * 10;
    setFit({ slope: slope, intercept: intercept });
  };

  const calculateError = () => {
    if (data && fit) {
      let total = 0;
      data.forEach((d, i) => {
        total += Math.abs(d.x * fit.slope + fit.intercept);
      });
      setError(total);
    }
  };

  const FitButton = () => {
    return (
      <button
        className="counter"
        onClick={() => {
          calculateError();
        }}
      >
        Fit Data
      </button>
    );
  };

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
        <DataButton />
        <FitButton />
      </div>
    </div>
  );
};

export default LinearRegression;
