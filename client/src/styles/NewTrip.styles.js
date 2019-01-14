import styled from "styled-components"
import { media, flexCenterMixin } from "./theme/mixins"

export const NewTripStyles = styled.div`
  .create-trip {
    display: flex;
    flex-direction: column;
  }

  .new-trip-form {
    z-index: 10000;
    position: relative;
    form {
      display: flex;
      flex-wrap: wrap;
    }

    .new-trip-form-field {
      ${flexCenterMixin};
    }

    button {
      width: 10rem;
    }
  }

  ${media.tablet`
    input {
      width: 10rem;
    }
  `}
  ${media.phone`
    input {
      width: 100%;
    }
  `}

  .waypoint-form {
    form {
      display: flex;
      flex-wrap: wrap;
    }

    button {
      width: 10rem;
    }

    .waypoint-form-field {
      ${flexCenterMixin};
    }
  }
`
