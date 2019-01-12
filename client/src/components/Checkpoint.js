import React from "react"
import Calendar from "react-calendar"
import { Card, CardHeader, CardBody, Collapse } from "reactstrap"
import { Button } from "../styles/theme/styledComponents"
import * as s from "../styles/Checkpoint.styles"

export default class Checkpoint extends React.Component {
  state = {
    openCalendar: false,
    eta: "",
    checkpoint: {
      name: "",
      start: "",
      end: ""
    }
  }

  handleChangeName = e => {
    const newName = e.target.value
    this.setState(state => ({
      checkpoint: { ...state.checkpoint, name: newName }
    }))
  }

  handleChangeETA = value => {
    if (value) {
      this.setState({
        checkpoint: { start: value, end: value },
        eta: value.toLocaleDateString(),
        openCalendar: false
      })
    }
  }

  handleCheckIn = () => {
    const { name, start, end } = this.state
    this.props.checkInCheckpoint(name, start, end)
  }

  handleReset = () => {
    this.setState({ checkpoint: { name: "", start: "", end: "" } })
    this.props.resetCheckpoint()
  }

  render() {
    const { order, complete } = this.props
    return (
      <s.CheckpointStyles>
        <Card>
          <CardHeader>
            {order ? `Checkpoint ${order}` : "New Checkpoint"}
          </CardHeader>
          <Collapse isOpen={true}>
            <CardBody>
              <div>
                <label>Name</label>
                <input
                  value={this.state.checkpoint.name}
                  onChange={this.handleChangeName}
                />
                <label>ETA:</label>
                <input
                  value={this.state.eta}
                  placeholder="01/01/2019"
                  onClick={() =>
                    this.setState(state => ({
                      openCalendar: !state.openCalendar
                    }))
                  }
                  onChange={() => null}
                />
                <Calendar
                  calendarType="US"
                  className={this.state.openCalendar ? "active" : "hidden"}
                  onChange={this.handleChangeETA}
                />
              </div>
              {complete ? (
                <Button onClick={this.handleReset}>Reset</Button>
              ) : (
                <Button onClick={this.handleCheckIn}>Check In</Button>
              )}
            </CardBody>
          </Collapse>
        </Card>
      </s.CheckpointStyles>
    )
  }
}
