import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap"

class TripCard extends Component {
  render() {
    console.log(this.props.name, "THIS")
    return (
      <div>
        {/* <p>{this.props.trip.name}</p> */}
        <p>TEST</p>

        <Card key={this.props.trip.id} trip={this.props.trip}>
          <p>{this.props.trip.name}</p>
          <CardBody>
            <CardTitle>{this.props.trip.name.substring(0, 21)}</CardTitle>
            <hr className="my-2" />
            <CardText>{this.props.trip.start.substring(0, 50)}</CardText>
            <CardText>{this.props.trip.end.substring(0, 50)}</CardText>
            {/* /* we may want a fucntion that will allow the user 
                             to start the trip when the start date = now() */}
            <p>{this.props.trip.start}</p>
            <Button>Start Trip</Button>
          </CardBody>
        </Card>
        {/* <ExportCSV notes={notes} /> */}

        {this.props.pending ? <h1>LOADING</h1> : null}
      </div>
    )
  }
}

export default TripCard
