import styled, { css } from "styled-components"
import { media } from "../styles/theme/mixins"

export const TripPicturesStyles = styled.div`
  visibility: visible;
  ${media.tablet`
    visibility: ${props => (props.toggle ? "visible" : "hidden")};
  `}

  position: relative;
  /*
  top: unset;
  bottom: 254px;
  z-index: 5;
  right: 0; */

  ${media.tablet`
    bottom: 50px;
    left: 0;
    padding-left: 50px;
  `}

  background: white;
  span.chevron-icon {
    position: absolute;
    top: 0.25rem;
    left: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;
    ${media.tablet`
      visibility: hidden;
    `}
  }

  .trip-pictures-wrapper {
    display: flex;
    flex-direction: column;
    height: 75px;
    max-width: 100vw;
    padding: 0 12px 10px;
    /* height: 150px; */
    /* width: 500px; */
    /* padding: 1.5rem 0.75rem 0; */
    ${media.tablet`
      width: 100%;
      padding: 0.75rem 0.75rem 0;
      height: 200px;
    `}
  }
  .chevron-wrapper {
    cursor: pointer;
  }

  .trip-pictures-header {
    margin-bottom: 0.5rem;
    padding-right: 0.25rem;
    text-align: right;

    /* NEW STYLES */
    position: absolute;
    top: -56px;
    right: 15px;
  }

  .upload-button {
    position: relative;
    width: 145px;
    margin: 0;
    input {
      position: absolute;
      top: -1;
      left: -1;
      width: 145px;
      height: 38px;
      opacity: 0;
    }
  }

  .trip-pictures {
    display: flex;
    flex-direction: column;
    .trip-picture-list {
      display: flex;
      flex-wrap: wrap;
      overflow-y: scroll;
    }
  }

  ${props => props.isHidden && isHiddenStyles}
`

const isHiddenStyles = css`
  .trip-pictures-wrapper {
    height: 150px;
    padding: 12px 12px 8px 12px;
    width: 60px;
    span.chevron-icon {
      top: 0.35rem;
      left: 0.525rem;
      height: 2.5rem;
      width: 2.5rem;
    }
  }

  i {
    position: absolute;
    bottom: 12px;
    font-size: 2rem;
  }

  .trip-pictures {
    visibility: hidden;
  }
`

export const ImageThumbnails = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 0.25rem;
  width: 25%;
  img {
    width: 100%;
    height: 100%;
  }
`
