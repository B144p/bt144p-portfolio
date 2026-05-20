import { Col, Progress, Row, Skeleton } from "antd";
import ReactEChart, { EChartsOption } from "echarts-for-react";
import moment from "moment";
import { FC, useEffect, useRef, useState } from "react";
import Calendar from "react-github-contribution-calendar";
import styled from "styled-components";
import { IStatContribution } from "../../../../api/portfolioApi";
import { useAppSelector } from "../../../../app/store";
import { colors } from "../../../../utils/colors";
import { numberFloatFormat } from "../../../../utils/functions";
import {
  configPie,
  configRadar,
  panelAttributesConfig,
  panelColorsConfig,
  totalRowSpan,
} from "./statsSection.model";
import { breakpointCheck } from "../../../../components/BreakpointComp";
import { EBreakpoints } from "../../../../utils/breakpoint";

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

const StatsSection: FC = () => {
  const radarLangRef = useRef(null);
  const pieOSRef = useRef(null);
  const [radarOptions, setRadarOptions] = useState<EChartsOption>(configRadar);
  const [pieOptions, setPieOptions] = useState<EChartsOption>(configPie);

  const statistic = useAppSelector((state) => state.statistic.data);
  const loading = useAppSelector((state) => state.statistic.loading);

  const formatDate = (unixSeconds: number) =>
    moment.unix(unixSeconds).format("D MMMM YYYY");

  const formatContributions = (contributions: IStatContribution[]) =>
    contributions.reduce((acc, c) => {
      if (c.totalSeconds) {
        const level = Math.ceil(c.totalSeconds / (3 * 3600));
        acc[moment.unix(c.date).format("YYYY-MM-DD")] = Math.min(level, 4);
      }
      return acc;
    }, {} as Record<string, number>);

  const contributionSource = statistic
    ? formatContributions(statistic.contributions)
    : {};

  const contributionUntil = statistic?.contributions?.length
    ? moment.unix(statistic.contributions[statistic.contributions.length - 1].date).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");

  const sortedLanguages = statistic
    ? [...statistic.languages]
        .sort((a, b) => b.totalSeconds - a.totalSeconds)
        .slice(0, 6)
    : [];

  useEffect(() => {
    if (statistic?.languages?.length) {
      const sorted = [...statistic.languages]
        .sort((a, b) => b.totalSeconds - a.totalSeconds)
        .slice(0, 6);
      const scale = (v: number) => Math.cbrt(v);
      const scaledMax = scale(sorted[0].percent) * 1.1;
      setRadarOptions((prev: EChartsOption) => ({
        ...prev,
        radar: {
          indicator: sorted.map((lang) => ({
            name: lang.language,
            max: scaledMax,
          })),
        },
        series: [
          {
            type: "radar",
            symbol: "none",
            data: [{ value: sorted.map((lang) => scale(lang.percent)) }],
            areaStyle: { opacity: 0.375 },
          },
        ],
      }));
    }
  }, [statistic]);

  useEffect(() => {
    if (statistic?.operatingSystems?.length) {
      setPieOptions((prev: EChartsOption) => {
        const series = prev.series.map((serie: any) => ({
          ...serie,
          data: statistic.operatingSystems.map((os) => ({
            name: os.os,
            value: os.percent,
            text: os.humanReadable,
          })),
        }));
        return { ...prev, series };
      });
    }
  }, [statistic]);

  return (
    <StatsSectionStyled>
      <h1>Statistics</h1>
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <>
          <Row>
            <Col {...totalRowSpan} className="head-stats">
              <h2>Range :</h2>
              <p>
                {statistic
                  ? `${formatDate(statistic.startDate)} - ${formatDate(statistic.endDate)}`
                  : "-"}
              </p>
            </Col>
            <Col {...totalRowSpan} className="head-stats">
              <h2>Total Time :</h2>
              <p>{statistic?.humanReadable ?? "0 hrs 0 mins"}</p>
            </Col>
          </Row>

          <Row
            gutter={[8, 8]}
            style={{ marginTop: "1rem" }}
            justify="center"
            align="middle"
          >
            <Col sm={12} xs={24}>
              <ReactEChart
                style={{ width: "100%" }}
                option={radarOptions}
                ref={radarLangRef}
              />
            </Col>
            <Col sm={12} xs={24}>
              {sortedLanguages.map((lang) => (
                <ProgressRowStyled key={lang.language}>
                  <span>{`${lang.language} => ${lang.humanReadable}`}</span>
                  <Progress
                    className="progress-styled"
                    percent={lang.percent}
                    status="active"
                    format={(percent) => numberFloatFormat(percent ?? 0) + "%"}
                    strokeColor={colors.greenLight}
                    style={{ marginBottom: 0 }}
                  />
                </ProgressRowStyled>
              ))}
            </Col>
          </Row>

          <Row
            gutter={[8, 8]}
            style={{ marginTop: "1rem" }}
            justify="center"
            align="middle"
          >
            <Col sm={12} xs={24}>
              <ReactEChart
                style={{ width: "100%" }}
                option={pieOptions}
                ref={pieOSRef}
              />
            </Col>
            <Col sm={12} xs={24}>
              {statistic?.operatingSystems.map((os) => (
                <ProgressRowStyled key={os.os}>
                  <span>{`${os.os} => ${os.humanReadable}`}</span>
                  <Progress
                    className="progress-styled"
                    percent={os.percent}
                    status="active"
                    format={(percent) => numberFloatFormat(percent ?? 0) + "%"}
                    strokeColor={colors.greenLight}
                    style={{ marginBottom: 0 }}
                  />
                </ProgressRowStyled>
              ))}
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
                until={contributionUntil}
                panelColors={panelColorsConfig}
                panelAttributes={panelAttributesConfig}
                weekLabelAttributes={undefined}
                monthLabelAttributes={undefined}
              />
            </div>
          </Row>
        </>
      )}
    </StatsSectionStyled>
  );
};

export default StatsSection;
