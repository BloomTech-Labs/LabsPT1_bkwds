import React from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"

class DeleteModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: {
        id: this.props.trip.id
      }
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }
  handleDeleteTrip = () => {
    console.log("PROPS", this.props.trip)
    this.props.deleteNote(this.props.trip.id)
  }
  render() {
    return (
      <div>
        <a className={"textLink"} onClick={this.toggle}>
          {this.props.buttonLabel}delete
        </a>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody>Are you sure you want to delete this?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleDeleteNote}>
              Delete
            </Button>{" "}
            <Button color="info" onClick={this.toggle}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default DeleteModal
