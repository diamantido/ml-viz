import { useMemo } from "react";
import type { ScaleLinear } from "d3";

type AxisProps = {
  scale: ScaleLinear<number, number>;
  pixelsPerTick: number;
};

const TICK_LENGTH = 6;

export const XAxis = ({ scale, pixelsPerTick }: AxisProps) => {
  const range = scale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return scale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: scale(value),
    }));
  }, [scale]);

  return (
    <>
      {/* Main horizontal line */}
      <path
        d={["M", range[0], 0, "L", range[1], 0].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2={TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export const YAxis = ({ scale, pixelsPerTick }: AxisProps) => {
  const range = scale.range();
  const height = range[0] - range[1];
  const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

  return (
    <>
      {/* Main vertical line */}
      <path
        d={["M", 0, range[0], "L", 0, range[1]].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {scale.ticks(numberOfTicksTarget).map((value, i) => (
        <g key={value} transform={`translate(0, ${scale(value)})`}>
          <line x2={-TICK_LENGTH} stroke="currentColor" />
          <text className="tick" key={value}>
            {value}
          </text>
        </g>
      ))}
    </>
  );
};
