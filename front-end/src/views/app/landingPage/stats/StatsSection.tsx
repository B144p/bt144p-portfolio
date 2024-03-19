import { Col, Progress, Row } from "antd";
import axios from "axios";
import ReactEChart, { EChartsOption } from "echarts-for-react";
import moment from "moment";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  WAKA_SHARE_ACTIVITY_URL,
  WAKA_SHARE_LANGUAGES_URL,
  WAKA_SHARE_OS_URL,
} from "../../../../api/endpoints";
import {
  IWakaActivitySource,
  IWakaLanguageSource,
  IWakaOsSource,
} from "../../../../slices/wakatime/wakatime.model";
import { colors } from "../../../../utils/colors";
import { getDataFromCache, numberFloatFormat, storeCacheData } from "../../../../utils/functions";

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

const StatsSection: FC<Props> = () => {
  const radarLangRef = useRef(null);
  const pieOSRef = useRef(null);
  const [radarOptions, setRadarOptions] = useState<EChartsOption>(configRadar);
  const [pieOptions, setPieOptions] = useState<EChartsOption>(configPie);
  const [wakaOsSource, setWakaOsSource] = useState<IWakaOsSource[]>([]);
  const [wakaLanguageSource, setWakaLanguageSource] = useState<
    IWakaLanguageSource[]
  >([]);
  const [WakaActivitySource, setWakaActivitySource] =
    useState<IWakaActivitySource>();

  const wakatimeApiSet = [
    { name: "waka_os", url: WAKA_SHARE_OS_URL, setState: setWakaOsSource },
    { name: "waka_languages", url: WAKA_SHARE_LANGUAGES_URL, setState: setWakaLanguageSource },
    { name: "waka_activity", url: WAKA_SHARE_ACTIVITY_URL, setState: setWakaActivitySource },
  ];

  const formatDate = (date?: moment.Moment) =>
    moment(date).format("D MMMM YYYY");

  useEffect(() => {
    if (wakaLanguageSource.length) {
      setRadarOptions((prev: EChartsOption) => {
        const maxRangeIndicator = wakaLanguageSource[0].percent * 1.1;
        const langData: {
          indicator: { name: string; max: number }[];
          series_data: number[];
        } = {
          indicator: [],
          series_data: [],
        };

        wakaLanguageSource.slice(0, 6).forEach((lang) => {
          langData.indicator.push({
            name: lang.name,
            max: maxRangeIndicator,
          });
          langData.series_data.push(lang.percent);
        });

        return {
          ...prev,
          radar: {
            indicator: langData.indicator,
          },
          series: [
            {
              type: "radar",
              symbol: "none",
              data: [{ value: langData.series_data }],
              areaStyle: {
                opacity: 0.375,
              },
            },
          ],
        };
      });
    }
  }, [wakaLanguageSource]);

  useEffect(() => {
    if (wakaOsSource.length) {
      setPieOptions((prev: EChartsOption) => {
        const series = prev.series.map((serie: any) => ({
          ...serie,
          data: wakaOsSource.map((os) => ({
            name: os.name,
            value: os.percent,
          })),
        }));
        return {
          ...prev,
          series,
        };
      });
    }
  }, [wakaOsSource]);

  useEffect(() => {
    wakatimeApiSet.forEach((api) => {
      const cachedData = getDataFromCache(api.name);
      if (cachedData) {
        api.setState(cachedData);
      } else {
        axios.get(api.url).then((res) => {
          api.setState(res.data.data);
          storeCacheData(res.data.data, api.name);
        });
      }
    });
  }, []);

  return (
    <StatsSectionStyled>
      <h1>Statistics</h1>
      <Row>
        <Col {...totalRowSpan} className="head-stats">
          <h2>Range :</h2>
          <p>
            {formatDate(WakaActivitySource?.range.start)} -{" "}
            {formatDate(WakaActivitySource?.range.end)}
          </p>
        </Col>
        <Col {...totalRowSpan} className="head-stats">
          <h2>Total Time :</h2>
          <p>
            {WakaActivitySource?.grand_total
              .human_readable_total_including_other_language ?? "0 hrs 0 mins"}
          </p>
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
          {wakaLanguageSource.slice(0, 6).map((lang) => {
            return (
              <ProgressRowStyled key={lang.name}>
                <span>{`${lang.name} => ${lang.text}`}</span>
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
          {wakaOsSource.map((os) => {
            return (
              <ProgressRowStyled key={os.name}>
                <span>{`${os.name} => ${os.text}`}</span>
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
