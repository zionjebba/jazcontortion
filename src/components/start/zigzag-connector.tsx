import { forwardRef, useImperativeHandle, useRef } from "react";

export type ZigzagConnectorHandle = {
  path: SVGPathElement | null;
  dot: SVGCircleElement | null;
};

export type ZigzagConnectorProps = {
  active?: boolean;
};

export const ZigzagConnector = forwardRef<ZigzagConnectorHandle, ZigzagConnectorProps>(
  ({ active = false }, ref) => {
    const pathRef = useRef<SVGPathElement>(null);
    const dotRef = useRef<SVGCircleElement>(null);

    useImperativeHandle(ref, () => ({
      get path() {
        return pathRef.current;
      },
      get dot() {
        return dotRef.current;
      },
    }));

    const pathId = "training-path";

    return (
      <div className="relative mx-auto h-48 w-full max-w-4xl opacity-80">
        <svg
          viewBox="0 0 800 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background subtle dashed path (unlit) */}
          <path
            d="
              M400 0
              C400 45 170 45 170 95
              C170 145 630 145 630 195
              C630 220 520 220 400 240
            "
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 12"
            className="text-primary/10"
          />

          {/* Active glowing path */}
          <path
            ref={pathRef}
            id={pathId}
            d="
              M400 0
              C400 45 170 45 170 95
              C170 145 630 145 630 195
              C630 220 520 220 400 240
            "
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            className="text-primary"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
            }}
          />

          {active && (
            <g ref={dotRef} className="text-primary opacity-0" filter="url(#glow)">
              {/* Outer pulsing ring */}
              <circle r="12" fill="currentColor" className="animate-ping opacity-20" />
              <circle r="16" fill="currentColor" className="opacity-10" />
              {/* Core dot */}
              <circle r="6" fill="currentColor" />
            </g>
          )}
        </svg>
      </div>
    );
  }
);

ZigzagConnector.displayName = "ZigzagConnector";
