import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { flexCenterMixin } from "../../styles/theme/mixins"

const ModalContainer = styled.div`
  ${flexCenterMixin};
  background: rgba(0, 0, 0, 0.75);
  height: 100vh;
  width: 100vw;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  ${props => (props.isOpen ? "display: flex" : "display: none")};
`

const ModalWrapper = styled.div`
  will-change: opacity, transform;
  -webkit-animation: fadeIn 0.4s ease;
  animation: fadeIn 0.4s ease;
  background: white;
  ${flexCenterMixin};
  border-radius: 2px;
  flex-direction: column;
  justify-content: space-evenly;
  top: calc(50% - (66% / 2));

  .onboarding-flow {
    z-index: 101;
    max-width: 630px;
    max-height: 590px;
    padding: 2rem;
    height: 650px;
  }

  .startTrip-flow {
    z-index: 101;
    max-width: 630px;
    max-height: 590px;
    padding: 2rem;
  }

  .flow-header {
    padding: 0px 30px 0 30px;
    margin-bottom: 24px;
    h4 {
      font-size: 2rem;
      font-weight: 600;
    }
  }
  .text-align-right {
    text-align: right;
    button {
      width: unset;
      padding-left: 3.5rem;
      padding-right: 3.5rem;
    }
  }

  .dual-buttons {
    display: flex;
    justify-content: space-around;
    button {
      width: unset;
      padding-left: 3.5rem;
      padding-right: 3.5rem;
    }
  }
`

const Modal = ({ children, isOpen }) => (
  <ModalContainer isOpen={isOpen} className="ModalContainer">
    <ModalWrapper className="ModalWrapper">{children()}</ModalWrapper>
  </ModalContainer>
)

Modal.propTypes = {
  children: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default Modal
