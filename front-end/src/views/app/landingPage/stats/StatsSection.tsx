import { Col, Progress, Row } from "antd";
import axios from "axios";
import ReactEChart, { EChartsOption } from "echarts-for-react";
import moment from "moment";
import { FC, useEffect, useRef, useState } from "react";
import Calendar from "react-github-contribution-calendar";
import styled from "styled-components";
import {
  WAKA_SHARE_ACTIVITY_URL,
  WAKA_SHARE_CONTRIBUTIONS_URL,
  WAKA_SHARE_LANGUAGES_URL,
  WAKA_SHARE_OS_URL,
} from "../../../../api/endpoints";
import {
  IWakaActivitySource,
  IWakaContributionSource,
  IWakaLanguageSource,
  IWakaOsSource,
} from "../../../../slices/wakatime/wakatime.model";
import { colors } from "../../../../utils/colors";
import {
  getDataFromCache,
  numberFloatFormat,
  storeCacheData,
} from "../../../../utils/functions";
import {
  configPie,
  configRadar,
  panelAttributesConfig,
  panelColorsConfig,
  totalRowSpan,
} from "./statsSection.model";
import { breakpointCheck } from "../../../../components/BreakpointComp";
import { EBreakpoints } from "../../../../utils/breakpoint";

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

const StatsSection: FC<Props> = () => {
  const radarLangRef = useRef(null);
  const pieOSRef = useRef(null);
  const [radarOptions, setRadarOptions] = useState<EChartsOption>(configRadar);
  const [pieOptions, setPieOptions] = useState<EChartsOption>(configPie);
  const [wakaOsSource, setWakaOsSource] = useState<IWakaOsSource>();
  const [wakaLanguageSource, setWakaLanguageSource] =
    useState<IWakaLanguageSource>();
  const [WakaActivitySource, setWakaActivitySource] =
    useState<IWakaActivitySource>();
  const [wakaContributionsSource, setWakaContributionsSource] =
    useState<IWakaContributionSource>();

  const wakatimeApiSet = [
    { name: "waka_os", url: WAKA_SHARE_OS_URL, setState: setWakaOsSource },
    {
      name: "waka_languages",
      url: WAKA_SHARE_LANGUAGES_URL,
      setState: setWakaLanguageSource,
    },
    {
      name: "waka_activity",
      url: WAKA_SHARE_ACTIVITY_URL,
      setState: setWakaActivitySource,
    },
    {
      name: "waka_contributions",
      url: WAKA_SHARE_CONTRIBUTIONS_URL,
      setState: setWakaContributionsSource,
    },
  ];

  const formatDate = (date?: moment.Moment) =>
    moment(date).format("D MMMM YYYY");

  const formatContributions = (data?: IWakaContributionSource) => {
    if (data) {
      const formatData = data.days
        .filter((contribute) => contribute.total)
        .map(({ date, total }) => ({ date, total }));

      return formatData.reduce((acc, current) => {
        const level = Math.ceil(current.total / (3 * 3600)); // step size = 3 hr.
        acc[current.date] = Math.min(level, 4); // max level is 4
        return acc;
      }, {} as Record<string, number>);
    }
    return {};
  };

  const contributionSource = formatContributions(wakaContributionsSource);

  useEffect(() => {
    if (wakaLanguageSource?.data.length) {
      setRadarOptions((prev: EChartsOption) => {
        const maxRangeIndicator = wakaLanguageSource?.data[0].percent * 1.1;
        const langData: {
          indicator: { name: string; max: number }[];
          series_data: number[];
        } = {
          indicator: [],
          series_data: [],
        };

        wakaLanguageSource?.data.slice(0, 6).forEach((lang) => {
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
    if (wakaOsSource?.data.length) {
      setPieOptions((prev: EChartsOption) => {
        const series = prev.series.map((serie: any) => ({
          ...serie,
          data: wakaOsSource?.data.map((os) => ({
            name: os.name,
            value: os.percent,
            text: os.text,
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
          api.setState(res.data);
          storeCacheData(res.data, api.name, 4);
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
            {formatDate(WakaActivitySource?.data.range.start)} -{" "}
            {formatDate(WakaActivitySource?.data.range.end)}
          </p>
        </Col>
        <Col {...totalRowSpan} className="head-stats">
          <h2>Total Time :</h2>
          <p>
            {WakaActivitySource?.data.grand_total
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
          {wakaLanguageSource?.data.slice(0, 6).map((lang) => {
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
          {wakaOsSource?.data.map((os) => {
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
      <Row justify="center">
        <div
          style={{
            width: "min(100%, 45rem)",
            paddingTop: breakpointCheck({
              mode: "<=",
              breakpoint: EBreakpoints.sm,
            })
              ? "2rem"
              : "unset",
          }}
        >
          <Calendar
            values={contributionSource}
            until={moment().format("YYYY-MM-DD")}
            panelColors={panelColorsConfig}
            panelAttributes={panelAttributesConfig}
            weekLabelAttributes={undefined}
            monthLabelAttributes={undefined}
          />
        </div>
      </Row>
    </StatsSectionStyled>
  );
};

export default StatsSection;
