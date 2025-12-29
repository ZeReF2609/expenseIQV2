'use client';

import React from "react";
import { useTranslation } from "@/hooks/use-translation";

export default function ExpenseBreakdown(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl bg-card border p-6 flex flex-col h-full">
      <h3 className="font-bold text-lg text-foreground mb-6">{t('dashboard.expenseBreakdown.title')}</h3>

      <div className="relative size-64 mx-auto mb-8 group">
        <div
          data-chart="chart-_r_b_"
          className="flex justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none mx-auto aspect-square h-full"
        >
          <style>
            {`[data-chart=chart-_r_b_] {
  --color-Comida: hsl(var(--chart-1));
  --color-Transporte: hsl(var(--chart-2));
  --color-Servicios: hsl(var(--chart-3));
  --color-Entretenimiento: hsl(var(--chart-4));
  --color-Salud: hsl(var(--chart-5));
  --color-Otros: hsl(var(--muted-foreground));
}

.dark [data-chart=chart-_r_b_] {
  --color-Comida: hsl(var(--chart-1));
  --color-Transporte: hsl(var(--chart-2));
  --color-Servicios: hsl(var(--chart-3));
  --color-Entretenimiento: hsl(var(--chart-4));
  --color-Salud: hsl(var(--chart-5));
  --color-Otros: hsl(var(--muted-foreground));
}`}
          </style>

          <div className="recharts-responsive-container" style={{ width: "100%", height: "100%", minWidth: 0 }}>
            <div
              className="recharts-wrapper"
              style={{ position: "relative", cursor: "default", width: "100%", height: "100%", maxHeight: 256, maxWidth: 256 }}
            >
              <svg
                cx="50%"
                cy="50%"
                className="recharts-surface"
                width="256"
                height="256"
                viewBox="0 0 256 256"
                style={{ width: "100%", height: "100%" }}
              >
                <title />
                <desc />
                <defs>
                  <clipPath id="recharts10-clip">
                    <rect x={5} y={5} height={246} width={246} />
                  </clipPath>
                </defs>
                <g className="recharts-layer recharts-pie" tabIndex={0}>
                  <g className="recharts-layer">
                    <g className="recharts-layer recharts-pie-sector" tabIndex={-1}>
                      <path
                        cx="128"
                        cy="128"
                        data-name="Comida"
                        stroke="hsl(var(--card))"
                        fill="hsl(var(--chart-1))"
                        strokeWidth={2}
                        tabIndex={-1}
                        className="recharts-sector"
                        d={"M 219.6515138991168,128 A8,8,0,0,0,227.62121075990956,119.30434782608695 A100,100,0,0,0,113.6307024849771,29.03776837133897 A8,8,0,0,0,106.99321674923837,38.78836927028226 L107.91367333488252,42.6973653331728 A8,8,0,0,0,116.81882079256644,48.78522087683855 A80,80,0,0,1,207.66873563711508,120.72727272727272 A8,8,0,0,0,215.6356092008266,128Z"}
                        role="img"
                      />
                    </g>

                    <g className="recharts-layer recharts-pie-sector" tabIndex={-1}>
                      <path
                        cx="128"
                        cy="128"
                        data-name="Transporte"
                        stroke="hsl(var(--card))"
                        fill="hsl(var(--chart-2))"
                        strokeWidth={2}
                        tabIndex={-1}
                        className="recharts-sector"
                        d={"M 99.29784796365041,40.95870825589574 A8,8,0,0,0,88.54376211361397,36.113084218410535 A100,100,0,0,0,59.42378247074208,55.21743073111598 A8,8,0,0,0,59.58638168288577,67.01166645365515 L62.584068895441234,69.68399912782408 A8,8,0,0,0,73.37051553239834,69.5566990425415 A80,80,0,0,1,96.14355142747824,54.61630505114725 A8,8,0,0,0,100.55549338935164,44.77260633122002Z"}
                        role="img"
                      />
                    </g>

                    <g className="recharts-layer recharts-pie-sector" tabIndex={-1}>
                      <path
                        cx="128"
                        cy="128"
                        data-name="Servicios"
                        stroke="hsl(var(--card))"
                        fill="hsl(var(--chart-3))"
                        strokeWidth={2}
                        tabIndex={-1}
                        className="recharts-sector"
                        d={"M 54.531232646044884,73.2063851941632 A8,8,0,0,0,42.943971562512516,75.4122445198379 A100,100,0,0,0,40.014281150509575,175.52381801305978 A8,8,0,0,0,51.45271745669402,178.40350717197447 L54.806798349949986,176.19497102618817 A8,8,0,0,0,57.46110868338616,165.73943311475335 A80,80,0,0,1,59.788766440257035,86.20014813114531 A8,8,0,0,0,57.75042189281609,75.60728318017219Z"}
                        role="img"
                      />
                    </g>

                    <g className="recharts-layer recharts-pie-sector" tabIndex={-1}>
                      <path
                        cx="128"
                        cy="128"
                        data-name="Entretenimiento"
                        stroke="hsl(var(--card))"
                        fill="hsl(var(--chart-4))"
                        strokeWidth={2}
                        tabIndex={-1}
                        className="recharts-sector"
                        d={"M 56.13695808168811,184.88324187532692 A8,8,0,0,0,55.28492879827729,196.6477852529009 A100,100,0,0,0,192.4804376021857,204.43476412360175 A8,8,0,0,0,192.96506202499563,192.64936748405563 L190.11848059156654,189.81661887385278 A8,8,0,0,0,179.34129196416518,189.35203125773705 A80,80,0,0,1,70.0463322627968,183.14863911109552 A8,8,0,0,0,59.28578907634946,182.39078246486315Z"}
                        role="img"
                      />
                    </g>

                    <g className="recharts-layer recharts-pie-sector" tabIndex={-1}>
                      <path
                        cx="128"
                        cy="128"
                        data-name="Salud"
                        stroke="hsl(var(--card))"
                        fill="hsl(var(--chart-5))"
                        strokeWidth={2}
                        tabIndex={-1}
                        className="recharts-sector"
                        d={"M 198.3524139917412,186.74127888916493 A8,8,0,0,0,210.04323170796116,185.17436602983716 A100,100,0,0,0,221.3651315730908,163.81832221558463 A8,8,0,0,0,216.10103618098265,153.2627675411303 L212.240703164412,152.1558260128986 A8,8,0,0,0,202.5778073006117,156.95083173646015 A80,80,0,0,1,193.8155759368329,173.47867592732865 A8,8,0,0,0,195.26977435093312,184.16740566177631Z"}
                        role="img"
                      />
                    </g>

                    <g className="recharts-layer recharts-pie-sector" tabIndex={-1}>
                      <path
                        cx="128"
                        cy="128"
                        data-name="Otros"
                        stroke="hsl(var(--card))"
                        fill="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        tabIndex={-1}
                        className="recharts-sector"
                        d={"M 226.1626779322186,147.08110744101407 A 100,100,0, 0,0, 227.61946980917457,136.71557427476583 L 207.69557584733963,134.97245941981265 A 80,80,0, 0,1, 206.5301423457749,143.26488595281126 Z"}
                        role="img"
                      />
                    </g>
                  </g>
                </g>
              </svg>

              <div
                tabIndex={-1}
                className="recharts-tooltip-wrapper"
                style={{ visibility: "hidden", pointerEvents: "none", position: "absolute", top: 0, left: 0 }}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-4 rounded-full bg-card flex items-center justify-center flex-col z-10">
          <p className="text-muted-foreground text-xs uppercase font-medium tracking-wide">{t('dashboard.expenseBreakdown.topCategory')}</p>
          <p className="text-3xl font-bold text-primary mt-1">31%</p>
          <p className="text-sm font-semibold text-foreground mt-1">Comida</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-1))", boxShadow: "0 0 8px 1px hsl(var(--chart-1))60" }} />
            <span className="text-sm font-medium text-foreground/80">Comida</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-foreground">$154.70</span>
            <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded font-light">31%</span>
          </div>
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))", boxShadow: "0 0 8px 1px hsl(var(--chart-2))60" }} />
            <span className="text-sm font-medium text-foreground/80">Transporte</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-foreground">$45.00</span>
            <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded font-light">9%</span>
          </div>
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-3))", boxShadow: "0 0 8px 1px hsl(var(--chart-3))60" }} />
            <span className="text-sm font-medium text-foreground/80">Servicios</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-foreground">$105.00</span>
            <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded font-light">21%</span>
          </div>
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-4))", boxShadow: "0 0 8px 1px hsl(var(--chart-4))60" }} />
            <span className="text-sm font-medium text-foreground/80">Entretenimiento</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-foreground">$145.00</span>
            <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded font-light">29%</span>
          </div>
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-5))", boxShadow: "0 0 8px 1px hsl(var(--chart-5))60" }} />
            <span className="text-sm font-medium text-foreground/80">Salud</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-foreground">$35.75</span>
            <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded font-light">7%</span>
          </div>
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full" style={{ backgroundColor: "hsl(var(--muted-foreground))", boxShadow: "0 0 8px 1px hsl(var(--muted-foreground))60" }} />
            <span className="text-sm font-medium text-foreground/80">Otros</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-foreground">$8.99</span>
            <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded font-light">2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
