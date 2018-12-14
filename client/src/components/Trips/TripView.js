import React, { Component } from "react"
import { Link } from "react-router-dom"
import DeleteModal from "../Modal"
import axios from "axios"

class TripView extends Component {
  componentDidMount() {
    axios
      .get(
        `https://backwoods-tracker.herokuapp.com/${this.state.id}`,
        this.trip
      )
      .then(res => {
        this.setState({ trip: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
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
      <div key={this.props.trip._id}>
        <div className={"textLink"}>
          <Link to={`/trip/edit/${this.props.trip.id}`} onClick={this.editTrip}>
            <a>edit</a>
          </Link>
          <Link to={`/trip/delete/`}>
            <DeleteModal
              show={this.props.modal}
              onClose={this.toggle}
              deleteTrip={this.deleteTrip}
              {...props}
            />
          </Link>
        </div>
        <div>
          <div className={"trip-description"}>
            <p>{this.props.trip.decription}</p>
          </div>
        </div>
        <div>
          <div className={"trip-amount"}>
            <p>{this.props.trip.amount}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default TripView
