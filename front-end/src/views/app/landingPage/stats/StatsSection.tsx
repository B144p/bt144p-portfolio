import { Col, Progress, Row } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import ReactEChart, { EChartsOption } from "echarts-for-react";
import { numberFloatFormat } from "../../../../utils/functions";
import { colors } from "../../../../utils/colors";
import styled from "styled-components";

type Props = {};

const ProgressRowStyled = styled(Row)`
  color: ${colors.primaryText};

  .ant-progress {
    .ant-progress-inner {
      background-color: ${colors.greenLighter}20;
    }
    .ant-progress-text {
      color: ${colors.primaryText};
    }
  }
`;

const StatsSectionStyled = styled.div`
  h1 {
    font-size: 2rem;
    margin: 0 0 1rem 1rem;
  }

  .head-stats {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;

    h2 {
      margin: 0;
      color: ${colors.brightText};
    }

    p {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }
  }

  .total-row {
    border: 1px solid;
  }
`;

const totalRowSpan = {
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

const configRadar = {
  title: {
    show: false,
  },
  radar: {
    // indicator: [],
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
      // data: [],
      areaStyle: {
        opacity: 0.375,
      },
    },
  ],
  color: ["#5470c6", "#91cc75"],
};

const configPie = {
  tooltip: {
    trigger: "item",
    formatter: (params: any) => {
      let { data, percent } = params;
      return `${params.marker} ${data.name} : ${Math.floor(
        data?.value ?? 0
      )} hrs ${Math.floor(((data?.value ?? 0) % 1) * 60)} mins (${percent}%)`;
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
        show: false,
        position: "center",
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

const langMockup = {
  time_total: {
    total_seconds: 720540.018522,
    hours: 200,
    minutes: 9,
  },
  language_stats: [
    { name: "TypeScript", value: 172.3, percent: 93.34 },
    { name: "Other", value: 5.1, percent: 2.73 },
    { name: "JSON", value: 3.1, percent: 1.66 },
    { name: "Python", value: 2.5, percent: 1.34 },
    { name: "YAML", value: 2.3, percent: 1.23 },
    { name: "Bash", value: 1.3, percent: 0.7 },
  ],
};

const OSMockup = [
  {
    total_seconds: 502701.018522,
    name: "Windows",
    percent: 65.2,
    digital: "139:38",
    decimal: 139.63,
    text: "139 hrs 38 mins",
    hours: 139,
    minutes: 38,
  },
  {
    total_seconds: 268363.067278,
    name: "Linux",
    percent: 34.8,
    digital: "74:32",
    decimal: 74.53,
    text: "74 hrs 32 mins",
    hours: 74,
    minutes: 32,
  },
];

const StatsSection: FC<Props> = () => {
  const radarLangRef = useRef(null);
  const pieOSRef = useRef(null);
  const [radarOptions, setRadarOptions] = useState<EChartsOption>(configRadar);
  const [pieOptions, setPieOptions] = useState<EChartsOption>(configPie);

  // Whenever can get real wakatime => un comment useEffect on below
  // useEffect(() => {
  //   if (langMockup) {
  //     setRadarOptions((prev: EChartsOption) => {
  //       const maxRangeIndicator = langMockup.language_stats[0].percent * 1.1;
  //       const langData: {
  //         indicator: { name: string; max: number }[];
  //         series_data: number[];
  //       } = {
  //         indicator: [],
  //         series_data: [],
  //       };

  //       langMockup.language_stats.forEach((lang) => {
  //         langData.indicator.push({
  //           name: lang.name,
  //           max: maxRangeIndicator,
  //         });
  //         langData.series_data.push(lang.percent);
  //       });

  //       return {
  //         ...prev,
  //         radar: {
  //           indicator: langData.indicator,
  //         },
  //         series: [
  //           {
  //             type: "radar",
  //             symbol: "none",
  //             data: [{ value: langData.series_data }],
  //             areaStyle: {
  //               opacity: 0.375,
  //             },
  //           },
  //         ],
  //       };
  //     });
  //   }
  // }, [langMockup]);

  useEffect(() => {
    if (OSMockup) {
      setPieOptions((prev: EChartsOption) => {
        const series = prev.series.map((serie: any) => ({
          ...serie,
          data: OSMockup.map((os) => ({ name: os.name, value: os.decimal })),
        }));
        return {
          ...prev,
          series,
        };
      });
    }
  }, [OSMockup]);

  return (
    <StatsSectionStyled>
      <h1>Statistics</h1>
      <Row>
        <Col {...totalRowSpan} className="head-stats">
          <h2>Range :</h2>
          <p>25 December 2023 - 19 February 2024</p>
        </Col>
        <Col {...totalRowSpan} className="head-stats">
          <h2>Total Time :</h2>
          <p>200 hrs 9 mins</p>
        </Col>
      </Row>

      <Row
        gutter={[8, 8]}
        style={{
          marginTop: "1rem",
        }}
        justify="center"
        align="middle"
      >
        <Col sm={12} xs={24}>
          <ReactEChart
            style={{
              width: "100%",
            }}
            option={radarOptions}
            ref={radarLangRef}
          />
        </Col>
        <Col sm={12} xs={24}>
          {langMockup.language_stats.map((lang) => {
            return (
              <ProgressRowStyled key={lang.name}>
                <span>{lang.name}</span>
                <Progress
                  className="progress-styled"
                  percent={lang.percent}
                  status="active"
                  format={(percent) => numberFloatFormat(percent ?? 0) + "%"}
                  strokeColor={colors.greenLight}
                  style={{ marginBottom: 0 }}
                />
              </ProgressRowStyled>
            );
          })}
        </Col>
      </Row>

      <Row
        gutter={[8, 8]}
        style={{
          marginTop: "1rem",
        }}
        justify="center"
        align="middle"
      >
        <Col sm={12} xs={24}>
          <ReactEChart
            style={{
              width: "100%",
            }}
            option={pieOptions}
            ref={pieOSRef}
          />
        </Col>
        <Col sm={12} xs={24}>
          {OSMockup.map((os) => {
            return (
              <ProgressRowStyled key={os.name}>
                <span>{os.name}</span>
                <Progress
                  className="progress-styled"
                  percent={os.percent}
                  status="active"
                  format={(percent) => numberFloatFormat(percent ?? 0) + "%"}
                  strokeColor={colors.greenLight}
                  style={{ marginBottom: 0 }}
                />
              </ProgressRowStyled>
            );
          })}
        </Col>
      </Row>
    </StatsSectionStyled>
  );
};

export default StatsSection;
