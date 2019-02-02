import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { flexCenterMixin, media } from "../../styles/theme/mixins"

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

  .modal-inner {
    z-index: 101;
    max-width: 630px;
    padding: 2rem;
    height: 700px;
    max-height: 100vh;
    ${flexCenterMixin};
    flex-direction: column;
    align-items: unset;
  }

  .flow-header {
    padding: 3.25rem 1.75rem 0;
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

  ${media.tablet`
    max-height: 100vh;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 700px;

    button.close-modal-button {
      right: 2rem;
      top: 2rem;
    }
  `}

  ${media.phone`
    height: 530px;
    div, p {
      font-size: 0.825rem;
    }
    .modal-inner {
      max-height: 100vh;
      padding: 1rem;
      button.close-modal-button {
        right: 1.5rem;
        top: 0.25rem;
        font-size: 2.25rem;
      }
    }
    .flow-header {
      padding: 2.75rem 1rem 0 1rem;
      h4 {
        font-size: 1.525rem;
        text-align: center;
      }
    }
    
  `}
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
