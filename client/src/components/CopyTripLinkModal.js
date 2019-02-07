import React, { Component } from "react"
import { Button } from "../styles/theme/styledComponents"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { CopyToClipboard } from "react-copy-to-clipboard"
import PropTypes from "prop-types"
import { TripPropTypes } from "./propTypes"

class CopyTripLinkModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      copied: false
    }

    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  handlePublic = () => {
    this.props.handleTogglePublic(this.props.trip.id)
    this.setState(prevState => ({
      copied: !prevState.copied
    }))
  }
  handlePopupStatus = () => {
    this.setState(prevState => ({
      copied: !prevState.copied
    }))
  }

  render() {
    return (
      <div>
        <Button
          className={`btn-primary ${
            this.props.trip.isPublic ? "btn-gray" : ""
          }`}
          onClick={this.toggle}
        >
          {" "}
          {this.props.trip.isPublic ? "Make Private" : "Share!"}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Click on the link below to copy
          </ModalHeader>
          <ModalBody>
            <CopyToClipboard
              text={`bkwks.co/public/${this.props.trip.id}`}
              onCopy={() => {
                this.handlePopupStatus()
              }}
            >
              <div>{`bkwks.co/public/${this.props.trip.id}`}</div>
            </CopyToClipboard>
          </ModalBody>
          <ModalFooter>
            {this.state.copied ? "Copied. Please confirm public trip!" : ""}
            <span> </span>
            <Button className="btn-primary" onClick={this.handlePublic}>
              {this.props.trip.isPublic ? "Make Private" : "Make Public!"}
            </Button>{" "}
            <Button className="btn-gray" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

CopyTripLinkModal.propTypes = {
  trip: TripPropTypes,
  handleTogglePublic: PropTypes.func.isRequired
}

export default CopyTripLinkModal
