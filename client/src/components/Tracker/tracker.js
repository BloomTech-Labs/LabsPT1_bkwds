import React from "react"
import { Card, CardHeader, CardBody, Button, Collapse } from "reactstrap"
import "./index.css"

const checkpoints = [
  {
    id: 1,
    name: "Gate",
    iso: "someISOString"
  },
  {
    id: 2,
    name: "River",
    iso: "someISOString"
  },
  {
    id: 3,
    name: "Gate",
    iso: "someISOString"
  }
]

export const getCheckpointHeader = (index, total) => {
  if (total === 1) {
    return "Checkpoint"
  }
  return index === 0
    ? "Start"
    : index === total - 1
    ? "End"
    : `Checkpoint ${index}`
}

export const getCheckpointDateTime = checkpointISO => {
  return { date: "3/12", time: "5 pm" }
}

export const Tracker = props => {
  return (
    <div>
      {checkpoints.map((checkpoint, i) => (
        <Checkpoint key={checkpoint.id} checkpoint={checkpoint} i={i} />
      ))}
    </div>
  )
}

export class Checkpoint extends React.Component {
  state = {
    isOpen: this.props.checkpoint.status ? false : true,
    status: this.props.checkpoint.status
  }
  handleCheckIn = () => {
    const moment = new Date()
    this.setState({
      status: `Checked In @ ${moment.getHours()}:${moment.getMinutes()} pm`,
      isOpen: false
    })
  }
  handleReset = () => {
    this.setState({
      status: null
    })
  }
  render() {
    const { checkpoint, i } = this.props
    return (
      <Card>
        <CardHeader
          onClick={() => this.setState(state => ({ isOpen: !state.isOpen }))}
          className={this.state.status ? "green" : ""}
        >
          {getCheckpointHeader(i, checkpoint.length)}
        </CardHeader>
        <Collapse isOpen={this.state.isOpen}>
          <CardBody>
            <div>
              <h6>{checkpoint.name}</h6>
              <span>
                ETA: {getCheckpointDateTime(checkpoint.iso).date} @{" "}
                {getCheckpointDateTime(checkpoint.iso).time}
              </span>
            </div>
            <div>
              {this.state.status && <span>Status: {this.state.status}</span>}
            </div>
            {this.state.status ? (
              <Button onClick={this.handleReset}>Reset</Button>
            ) : (
              <Button onClick={this.handleCheckIn}>Check In</Button>
            )}
          </CardBody>
        </Collapse>
      </Card>
    )
  }
}
