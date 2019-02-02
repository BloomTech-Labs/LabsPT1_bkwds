import styled, { css } from "styled-components"
import { media } from "../styles/theme/mixins"

const isHiddenStyles = css`
  #elevationChart {
    height: 0;
    svg {
      margin-top: 1rem;
    }
  }

  .elevation-chart-wrapper {
    padding: 12px 12px 8px 12px;
    width: 90px;
    span.chevron-icon {
      top: 0.35rem;
      right: 0.5rem;
      height: 2.25rem;
      width: 2.25rem;
    }
  }
`

export const ElevationChartStyles = styled.div`
  visibility: visible;
  ${media.tablet`
    visibility: ${props => (props.toggle ? "visible" : "hidden")};
  `}

  .elevation-chart-wrapper {
    border-radius: 2px 2px 0 0;
    padding: 24px 0 8px 12px;
    background: white;
    position: absolute;
    right: 1.5rem;
    top: unset;
    bottom: 50px;
    z-index: 5;

    .chevron-wrapper {
      cursor: pointer;
      width: 50px;
    }

    span.chevron-icon {
      position: absolute;
      top: 0.125rem;
      right: 1.25rem;
      height: 1.5rem;
      width: 1.5rem;

      ${media.tablet`
        visibility: hidden;
      `}
    }

    ${media.tablet`
      max-width: 100vw; 
      z-index: 6;
      right: 0;
      left: 0;
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
