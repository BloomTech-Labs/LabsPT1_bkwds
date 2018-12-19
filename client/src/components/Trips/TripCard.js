import React, { Component } from "react"
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap"

const TripCard = ({ trip }) => {
  console.log(trip, "TRIP")
  return (
    <div>
      <Card key={trip.id} trip={trip}>
        <CardBody>
          <CardTitle>{trip.name.substring(0, 21)}</CardTitle>
          <hr className="my-2" />
          <CardText>{trip.start.substring(0, 50)}</CardText>
          <CardText>{trip.end.substring(0, 50)}</CardText>
          {/* we may want a fucntion that will allow the user 
                             to start the trip when the start date = now() */}
          <Button>Start Trip</Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default TripCard
