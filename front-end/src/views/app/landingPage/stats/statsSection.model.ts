export const totalRowSpan = {
  sm: {
    span: 20,
    offset: 2,
  },
  md: {
    span: 12,
    offset: 0,
  },
  xs: 24,
};

// Tailwind grid equivalent of totalRowSpan above: stacked full-width below
// sm, centered at 5/6 width (matches span:20/offset:2 of 24) from sm, then
// two even columns (matches span:12/offset:0 of 24) from md.
export const totalStatItemClassName =
  "w-full sm:mx-auto sm:w-5/6 md:mx-0 md:w-auto";

export const configRadar = {
  title: {
    show: false,
  },
  radar: {
    indicator: [
      { name: "STR", max: 50 },
      { name: "VIT", max: 50 },
      { name: "DEX", max: 50 },
      { name: "AGI", max: 50 },
      { name: "INT", max: 50 },
      { name: "LUK", max: 50 },
    ],
  },
  series: [
    {
      type: "radar",
      symbol: "none",
      data: [
        {
          value: [32, 38, 26, 22, 15, 20],
        },
        {
          value: [20, 28, 32, 35, 18, 30],
        },
      ],
      areaStyle: {
        opacity: 0.375,
      },
    },
  ],
  color: ["#5470c6", "#91cc75"],
};

export const configPie = {
  tooltip: {
    trigger: "item",
    formatter: (params: {
      marker: string;
      percent: number;
      data: { name: string; text: string };
    }) => {
      const { data, percent } = params;
      return `${params.marker} ${data.name} : ${data.text} (${percent}%)`;
    },
  },
  // color: eChartPaletteColor,
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      padAngle: 20,
      itemStyle: {
        borderRadius: 5,
        borderColor: "transparent",
        borderWidth: 1,
      },
      labelLine: {
        show: false,
      },
      label: {
        show: true,
        position: "center",
        formatter: "{a|OS}",
        rich: {
          a: { fontSize: "2rem" },
        },
      },
      data: [],
      emphasis: {
        label: {
          show: true,
          fontSize: "1rem",
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

export const panelColorsConfig = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];
export const panelAttributesConfig = { rx: "0.125rem", ry: "0.125rem" };
