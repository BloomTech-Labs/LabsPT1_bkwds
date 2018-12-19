import React, { Component } from "react"
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap"

class TripCard extends Component {
  render() {
    return (
      <div>
        <Card key={this.props.trip.id} trip={this.props}>
          <CardBody>
            <CardTitle>{this.props.trip.name.substring(0, 21)}</CardTitle>
            <hr className="my-2" />
            <CardText>{this.props.trip.start.substring(0, 50)}</CardText>
            <CardText>{this.props.trip.end.substring(0, 50)}</CardText>
            {/* we may want a fucntion that will allow the user 
                             to start the trip when the start date = now() */}
            <Button>Start Trip</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default TripCard
