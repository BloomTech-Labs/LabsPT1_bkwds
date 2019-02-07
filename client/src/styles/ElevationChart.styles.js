import styled, { css } from "styled-components"
import { media } from "../styles/theme/mixins"

const isHiddenStyles = css`
  #elevationChart {
    visibility: hidden;
  }

  .elevation-chart-wrapper {
    padding: 12px 12px 8px 12px;
    width: 60px;
    height: 187px;
    span.chevron-icon {
      top: 0.35rem;
      left: 0.525rem;
      height: 2.5rem;
      width: 2.5rem;
    }
  }
`

export const ElevationChartStyles = styled.div`
  visibility: visible;

  /* These 2 lines are necessary for centering the chart in the middle of the screen */
  display: flex;
  justify-content: center;

  ${media.tablet`
    visibility: ${props => (props.toggle ? "visible" : "hidden")};
    .elevation-chart-wrapper {
      z-index: ${props => (props.toggle ? -1 : "inherit")};
    }
  `}

  .elevation-chart-wrapper {
    border-radius: 2px 2px 0 0;
    padding: 24px 0 8px 12px;
    /* padding: 16px 0 8px 12px; */
    background: white;

    position: absolute;
    right: 340px;
    bottom: unset;
    top: 0;
    z-index: 5;

    .chevron-icon-wrapper {
      cursor: pointer;
      width: 50px;
    }

    .chart-icon-wrapper {
      position: absolute;
      bottom: 12px;
    }

    span.chevron-icon {
      position: absolute;
      top: 0.25rem;
      left: 0.75rem;
      height: 1.5rem;
      width: 1.5rem;

      ${media.tablet`
        visibility: hidden;
      `}
    }

    ${media.tablet`
      max-width: 100vw; 
      z-index: ${props => (props.toggle ? 6 : -1)};
      right: 0;
      left: 0;
      top: unset;
      bottom: 50px;
    `}
  }

  text {
    font-size: 12px;
    stroke: none;
    fill: #999;
  }

  text.crossBarText {
    fill: #666;
    width: 200px;
  }

  path.domain {
    fill: none;
    stroke: #aaa;
  }

  g.tick {
    line {
      color: transparent;
      stroke: #eee;
      stroke-opacity: 1;
    }
  }

  .crossBar line {
    stroke: #333;
    stroke-width: 1px;
    pointer-events: none;
    shape-rendering: crispEdges;
  }

  .chartOverlay {
    fill: none;
    pointer-events: all;
  }

  .infoBox rect {
    stroke: #ccccd1;
    pointer-events: none;
    stroke-width: 1px;
    shape-rendering: crispEdges;
    font-size: 11px;
    fill: #fff;
    fill-opacity: 0.9;
  }

  tspan,
  text.crossBarText {
    font-size: 15px;
  }

  tspan {
    fill: #2d2d32;
  }

  .infoBoxElevationValue,
  .infoBoxGradeValue {
    font-weight: 600;
  }

  .elevationChartGrid line {
    stroke: lightgrey;
    stroke-opacity: 0.7;
    shape-rendering: crispEdges;
  }

  .elevationChartGrid path {
    stroke-width: 0;
  }

  ${props => props.isHidden && isHiddenStyles}
`
