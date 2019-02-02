import styled, { css } from "styled-components"
import { media } from "../styles/theme/mixins"

export const TripPicturesStyles = styled.div`
  visibility: visible;
  ${media.tablet`
    visibility: ${props => (props.toggle ? "visible" : "hidden")};
  `}

  position: absolute;
  top: unset;
  bottom: 50px;
  z-index: 5;
  left: 125px;

  ${media.tablet`
    left: 0;
    padding-left: 50px;
  `}

  background: white;
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

  .trip-pictures-wrapper {
    display: flex;
    flex-direction: column;
    height: 187px;
    width: 500px;
    max-width: 100vw;
    padding: 1.5rem 0.75rem 0;
    ${media.tablet`
      width: 100%;
      padding: 0.75rem 0.75rem 0;
    `}
  }
  .chevron-wrapper {
    cursor: pointer;
  }

  .trip-pictures-header {
    margin-bottom: 0.5rem;
  }

  .upload-button {
    position: relative;
    width: 145px;
    margin: 0;
    input {
      position: absolute;
      top: 0;
      left: 0;
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
    height: 50px;
    padding: 12px 12px 8px 12px;
    width: 90px;
    span.chevron-icon {
      top: 0.35rem;
      right: 0.5rem;
      height: 2.25rem;
      width: 2.25rem;
    }
  }

  i {
    font-size: 1.75rem;
  }

  .trip-pictures {
    padding-top: 10px;
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
