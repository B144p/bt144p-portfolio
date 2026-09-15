"use client";

import { Col, Progress, Row, Skeleton } from "antd";
import type { EChartsOption } from "echarts-for-react";
import dynamic from "next/dynamic";
import moment from "moment";
import { FC, useMemo } from "react";
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
import { useBreakpointCheck } from "../../../../components/BreakpointComp";
import { EBreakpoints } from "../../../../utils/breakpoint";

// Both render browser-measured canvas/SVG (echarts, react-measure) and the
// calendar lays out weeks in the local timezone, so they only render client-side.
const ReactEChart = dynamic(() => import("echarts-for-react"), { ssr: false });
const Calendar = dynamic(() => import("react-github-contribution-calendar"), {
  ssr: false,
});

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
  const breakpointCheck = useBreakpointCheck();

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

  // Anchored to the data, never to "now": a render-time clock read would
  // differ between the server's HTML and the browser's hydration.
  const contributionUntil = statistic?.contributions?.length
    ? moment.unix(statistic.contributions[statistic.contributions.length - 1].date).format("YYYY-MM-DD")
    : statistic
      ? moment.unix(statistic.endDate).format("YYYY-MM-DD")
      : undefined;

  const sortedLanguages = useMemo(
    () =>
      statistic
        ? [...statistic.languages]
            .sort((a, b) => b.totalSeconds - a.totalSeconds)
            .slice(0, 6)
        : [],
    [statistic],
  );

  const radarOptions = useMemo<EChartsOption>(() => {
    if (!sortedLanguages.length) return configRadar;
    const scale = (v: number) => Math.cbrt(v);
    const scaledMax = scale(sortedLanguages[0].percent) * 1.1;
    return {
      ...configRadar,
      radar: {
        indicator: sortedLanguages.map((lang) => ({
          name: lang.language,
          max: scaledMax,
        })),
      },
      series: [
        {
          type: "radar",
          symbol: "none",
          data: [{ value: sortedLanguages.map((lang) => scale(lang.percent)) }],
          areaStyle: { opacity: 0.375 },
        },
      ],
    };
  }, [sortedLanguages]);

  const pieOptions = useMemo<EChartsOption>(() => {
    if (!statistic?.operatingSystems?.length) return configPie;
    return {
      ...configPie,
      series: configPie.series.map((serie) => ({
        ...serie,
        data: statistic.operatingSystems.map((os) => ({
          name: os.os,
          value: os.percent,
          text: os.humanReadable,
        })),
      })),
    };
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
              {contributionUntil && (
                <Calendar
                  values={contributionSource}
                  until={contributionUntil}
                  panelColors={panelColorsConfig}
                  panelAttributes={panelAttributesConfig}
                  weekLabelAttributes={undefined}
                  monthLabelAttributes={undefined}
                />
              )}
            </div>
          </Row>
        </>
      )}
    </StatsSectionStyled>
  );
};

export default StatsSection;
