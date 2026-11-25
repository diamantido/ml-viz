import { scaleLinear } from "d3";
import { XAxis, YAxis } from "./Axes";
import type { LinearParams, Point } from "../types";

type ChartProps = {
  width: number;
  height: number;
  data: Point[];
  fit?: LinearParams;
  error?: number;
};

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

const Chart = ({ width, height, data, fit, error }: ChartProps) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const xScale = scaleLinear().domain([0, 10]).range([0, boundsWidth]);
  const yScale = scaleLinear().domain([0, 10]).range([boundsHeight, 0]);

  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={3}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        opacity={1}
        stroke="var(--accent-border)"
        fill="var(--accent)"
        fillOpacity={0.9}
        strokeWidth={1}
      />
    );
  });

  const fitLine = () => {
    if (fit) {
      let x1 = 0;
      let x2 = 10;
      let y1 = fit.intercept;
      let y2 = 10 * fit.slope + fit.intercept;

      if (y2 < 0) {
        y2 = 0;
        x2 = -fit.intercept / fit.slope;
      } else if (y2 > 10) {
        y2 = 10;
        x2 = (10 - fit.intercept) / fit.slope;
      }

      return (
        <line
          x1={xScale(x1)}
          x2={xScale(x2)}
          y1={yScale(y1)}
          y2={yScale(y2)}
          stroke="var(--text-h)"
          strokeWidth={2}
        />
      );
    }
  };

  const errorLines = () => {
    if (data && fit) {
      return (
        <>
          {data.map((d, i) => {
            return (
              <line
                key={i}
                x1={xScale(d.x)}
                x2={xScale(d.x)}
                y1={yScale(
                  Math.min(Math.max(0, fit.slope * d.x + fit.intercept), 10),
                )}
                y2={yScale(d.y)}
                className="error"
              ></line>
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      <div className="chart-wrapper">
        <svg width={width} height={height} shapeRendering={"crispEdges"}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
            overflow={"visible"}
          >
            <YAxis scale={yScale} pixelsPerTick={30} />
            <g transform={`translate(0, ${boundsHeight})`}>
              <XAxis scale={xScale} pixelsPerTick={30} />
            </g>
            {allShapes}
            {fit && fitLine()}
            {error && errorLines()}
          </g>
        </svg>
      </div>
    </>
  );
};

export default Chart;
