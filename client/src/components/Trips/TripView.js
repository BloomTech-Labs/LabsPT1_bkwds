import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

class TripView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trip: {},
      modal: false
    }
  }

  // componentDidMount() {
  //   axios
  //     .get(
  //       `https://backwoods-tracker.herokuapp.com/trips/${this.state.id}`,
  //       this.trip
  //     )
  //     .then(res => {
  //       this.setState({ trip: res.data })
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
  editTrip = () => {
    this.props.startEditing(this.props.trip)
    this.props.history.push(`/trips/edit/${this.props.trip.id}`)
  }
  deleteTrip = () => {
    this.props.deleteTrip(this.props.trip.id)
    this.props.history.push(`/trips/`)
  }

  render() {
    const { trip } = this.state
    const props = {
      trip: this.state
    }
    return (
      <div>
        <div key={props.trip.id}>
          <p>{props.trip.name}</p>
          <div className={"textLink"}>
            <Link to={`/trip/edit/${props.trip.id}`} onClick={this.editTrip}>
              <a>edit</a>
            </Link>
          </div>
          <div>
            <div className={"trip-start-end"}>
              <p>{props.trip.start}</p>
            </div>
          </div>
          <div>
            <div className={"trip-start-end"}>
              <p>{props.trip.end}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TripView
